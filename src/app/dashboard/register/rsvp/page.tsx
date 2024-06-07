// "use client"; 

// import { useRouter } from "next/router";
// import { useAuth } from "../../../contexts/Auth";
// import { useState, useEffect } from "react";


// const HackerRSVP = () => {
//     const { supabase, user, signOut } = useAuth();

//     const router = useRouter();

//     const [submitText, setSubmitText] = useState<string>("Submit RSVP");

//     const [attending, setAttending] = useState<any>(false);
//     const [overnight, setOvernight] = useState<any>(false);
//     const [dRestrictions, setDRestrictions] = useState<any>([]);
//     const [showOther, setShowOther] = useState<boolean>(false);
//     const [other, setOther] = useState<string>("");
//     const [mlh1, setMlh1] = useState<any>(false);
//     const [mlh2, setMlh2] = useState<any>(false);
//     const [mlh3, setMlh3] = useState<any>(false);
//     const [waiver, setWaiver] = useState<File | null>(null);
//     const restrictions = [
//         "Halal",
//         "Kosher",
//         "Vegetarian",
//         "Vegan",
//         "Gluten Free",
//         "Lactose Free",
//         "Nut Allergy",
//     ];

//     const logout = async () => {
//         const { error } = await signOut();
//         if (error) throw error;
//         router.push("/");
//     };

//     supabase
//         .from("hacker_registrations")
//         .select("*")
//         .eq("id", user?.id)
//         .then(({ data, error }: { data: any; error: any }) => {
//             const fetchedStatus = data?.[0]?.status;
//             if (error || !fetchedStatus) {
//                 alert(
//                     "Oh no! Your data could not be retrieved. If this error persists, contact the RythmHacks team."
//                 );
//                 logout();
//                 if (error) throw error;
//                 else
//                     throw TypeError(
//                         "no hacker registration matching the id was found"
//                     );
//             } else {
//                 if (fetchedStatus !== "Accepted") {
//                     router.push("/dashboard");
//                 }
//             }
//         });

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         setSubmitText("Working...");

//         if (!attending) {
//             if (
//                 !confirm(
//                     "Are you sure you aren't attending RythmHacks? Your acceptance will be forfeited and given to someone else. This action cannot be reverted."
//                 )
//             ) {
//                 setSubmitText("Submit RSVP");
//                 return;
//             }
//         }

//         let finalDRestrictions = dRestrictions;

//         if (finalDRestrictions.length === 0) {
//             finalDRestrictions = [other];
//         } else {
//             finalDRestrictions.push(other);
//         }

//         console.log(finalDRestrictions, other);

//         let { data, error } = await supabase
//             .from("hacker_registrations")
//             .update({
//                 status: attending ? "Confirmed" : "Not Attending",
//                 overnight: overnight,
//                 dietary_restrictions: finalDRestrictions,
//                 mlh_1: mlh1,
//                 mlh_2: mlh2,
//                 mlh_3: mlh3,
//             })
//             .eq("id", user?.id);
//         if (error) {
//             alert(
//                 "Something went wrong with submitting your RSVP! Please try again or contact rythmhacks@gmail.com if this error persists."
//             );
//             throw error;
//         }

//         if (waiver) {
//             let { data, error } = await supabase.storage
//                 .from("waivers")
//                 .upload(
//                     `${user?.id}.${
//                         waiver.name.split(".")[
//                             waiver.name.split(".").length - 1
//                         ]
//                     }`,
//                     waiver,
//                     {
//                         upsert: false,
//                     }
//                 );
//             if (error) {
//                 alert(
//                     "Something went wrong with submitting your RSVP! Please try again or contact rythmhacks@gmail.com if this error persists."
//                 );
//                 throw error;
//             }
//         }
//         alert(
//             "RSVP submitted successfully! You will now be directed back to the home page."
//         );
//         router.push("/dashboard");
//     };

//     function toggle(array: Array<string>, value: string) {
//         var index = array.indexOf(value);
//         let arr = array;

//         if (index === -1) {
//             arr.push(value);
//         } else {
//             arr.splice(index, 1);
//         }
//         return arr;
//     }

//     return (
//         <div className="page w-full" id="RSVP">
//             <div className="container">
//                 <h2>Hacker RSVP</h2>
//                 <p className="mb-4">
//                     Confirm your attendance and RSVP for the event here!{" "}
//                     <strong>
//                         The RSVP deadline is Monday, August 21st, at 11:59 PM.
//                     </strong>{" "}
//                     Be sure to submit the form before then!
//                 </p>
//             </div>
//             <div className="container mt-4">
//                 <h2>RSVP Questions</h2>

//                 <form onSubmit={handleSubmit} className="hacker-app-form">
//                     <div>
//                         <input
//                             className="mr-4"
//                             value={attending}
//                             onChange={(e) => {
//                                 setAttending(e.target.checked);
//                             }}
//                             type="checkbox"
//                             checked={attending}
//                         />
//                         <label
//                             onClick={() => setAttending(!attending)}
//                             className="cursor-pointer"
//                         >
//                             I am attending RythmHacks in-person over the weekend
//                             of September 1-3, and therefore require basic human
//                             necessities such as living space, food, water,
//                             merchandise, and other amenities.
//                         </label>
//                     </div>
//                     <div>
//                         <input
//                             className="mr-4"
//                             value={overnight}
//                             onChange={(e) => {
//                                 setOvernight(e.target.checked);
//                             }}
//                             type="checkbox"
//                             checked={overnight}
//                         />
//                         <label
//                             onClick={() => setOvernight(!overnight)}
//                             className="cursor-pointer"
//                         >
//                             I plan on staying overnight at the venue and will
//                             bring my own amenities such as a sleeping bag,
//                             pillow, eye mask, and toiletries. I acknowledge that
//                             sleeping space may be highly limited and that the
//                             RythmHacks Team recommends continue working on my
//                             project overnight at home rather than staying at the
//                             venue.
//                         </label>
//                     </div>
//                     <div className="mt-8">
//                         <h3>Dietary Restrictions</h3>
//                         <div className="flex flex-col">
//                             {restrictions.map(
//                                 (restriction: string, index: any) => {
//                                     return (
//                                         <div>
//                                             <input
//                                                 className="mr-4"
//                                                 onChange={() => {
//                                                     setDRestrictions(
//                                                         toggle(
//                                                             dRestrictions,
//                                                             restriction
//                                                         )
//                                                     );
//                                                 }}
//                                                 type="checkbox"
//                                             />
//                                             <label>{restriction}</label>
//                                         </div>
//                                     );
//                                 }
//                             )}
//                             <div className="flex-col">
//                                 <div className="flex">
//                                     <input
//                                         className="mr-4"
//                                         onChange={() => {
//                                             setShowOther(!showOther);
//                                         }}
//                                         type="checkbox"
//                                     />
//                                     <label>Other</label>
//                                 </div>
//                                 <input
//                                     className={`${
//                                         showOther ? "block" : "hidden"
//                                     } w-full`}
//                                     placeholder="Please specify"
//                                     value={other}
//                                     onChange={(e) => setOther(e.target.value)}
//                                 ></input>
//                             </div>
//                         </div>
//                         <div className="mt-8">
//                             <h3>MLH Checkboxes</h3>
//                             <p>
//                                 We are currently in the process of partnering
//                                 with MLH. The following 3 checkboxes are for
//                                 this partnership. If we do not end up partnering
//                                 with MLH, your information will not be shared.
//                             </p>
//                             <div className="flex flex-col gap-4 mt-4">
//                                 <div>
//                                     <input
//                                         className="mr-4"
//                                         value={mlh1}
//                                         onChange={(e) => {
//                                             setMlh1(e.target.checked);
//                                         }}
//                                         type="checkbox"
//                                         checked={mlh1}
//                                         required={attending}
//                                     />
//                                     <label
//                                         onClick={() => setMlh1(!mlh1)}
//                                         className="cursor-pointer"
//                                     >
//                                         I have read and agree to the{" "}
//                                         <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">
//                                             MLH Code of Conduct
//                                         </a>
//                                         .
//                                     </label>
//                                 </div>
//                                 <div>
//                                     <input
//                                         className="mr-4"
//                                         value={mlh2}
//                                         onChange={(e) => {
//                                             setMlh2(e.target.checked);
//                                         }}
//                                         type="checkbox"
//                                         checked={mlh2}
//                                         required={attending}
//                                     />
//                                     <label
//                                         onClick={() => setMlh2(!mlh2)}
//                                         className="cursor-pointer"
//                                     >
//                                         I authorize you to share my
//                                         application/registration information
//                                         with Major League Hacking for event
//                                         administration, ranking, and MLH
//                                         administration in-line with the{" "}
//                                         <a href="https://mlh.io/privacy">
//                                             MLH Privacy Policy
//                                         </a>
//                                         . I further agree to the terms of both
//                                         the{" "}
//                                         <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md">
//                                             MLH Contest Terms and Conditions
//                                         </a>{" "}
//                                         and the{" "}
//                                         <a href="https://mlh.io/privacy">
//                                             MLH Privacy Policy
//                                         </a>
//                                         .
//                                     </label>
//                                 </div>
//                                 <div>
//                                     <input
//                                         className="mr-4"
//                                         value={mlh3}
//                                         onChange={(e) => {
//                                             setMlh3(e.target.checked);
//                                         }}
//                                         type="checkbox"
//                                         checked={mlh3}
//                                     />
//                                     <label
//                                         onClick={() => setMlh3(!mlh3)}
//                                         className="cursor-pointer"
//                                     >
//                                         I authorize MLH to send me occasional
//                                         emails about relevant events, career
//                                         opportunities, and community
//                                         announcements. (optional)
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mt-8">
//                             <h3>Waiver</h3>
//                             <p>
//                                 Please download the waiver{" "}
//                                 <a
//                                     href="https://drive.google.com/file/d/17WiFlNnyrSOBUNs1xlyMTl4NdI3BQCFp/view?usp=sharing"
//                                     target="_blank"
//                                     rel="noreferrer"
//                                 >
//                                     here
//                                 </a>
//                                 , and upload a signed copy below.
//                             </p>
//                             <input
//                                 type="file"
//                                 onChange={(e) => {
//                                     if (e.target.files) {
//                                         setWaiver(e.target.files[0]);
//                                     } else {
//                                         setWaiver(null);
//                                     }
//                                 }}
//                                 className="w-full my-2"
//                                 required={attending}
//                             />
//                         </div>
//                         <button type="submit" className="mt-10 mr-2">
//                             {submitText}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default HackerRSVP;
