"use client";
import { useState, useEffect } from "react";
import Editor from "../../../components/Editor/Editor";
// import { useAuth } from "../../../contexts/Auth";
import { Database } from "../../../../types/supabase";
import "../Register.scss";
import { BsCloudCheck, BsCloudArrowUp } from "react-icons/bs";
import { AiOutlineWarning } from "react-icons/ai";
import { useReward } from "react-rewards";
import { useRouter } from "next/router";
import Link from "next/link";

type updateHackerRegistrationTableType =
    Database["public"]["Tables"]["hacker_registrations"]["Update"];
type autosavingIconType = "Saving..." | "Saved!" | "No changes detected" | "";

const HackerRegistration = () => {
    // const { supabase, user, signOut } = useAuth();
    // const [registrationData, setRegistrationData] = useState<updateHackerRegistrationTableType>({});
    // const [modifiedRegistrationData, setModifiedRegistrationData] =
    //     useState<updateHackerRegistrationTableType>({});
    // const [basicInfoAutosavingMessage, setBasicInfoAutosavingMessage] =
    //     useState<autosavingIconType>("No changes detected");
    // const [saving, setSaving] = useState<boolean>(false);
    // const [loading, setLoading] = useState(0);
    // const [submitted, setSubmitted] = useState<boolean>(false);
    // const [validationMessages, setValidationMessages] = useState<String[]>();
    // const [showValidationMessages, setShowValidationMessages] = useState<boolean>(false);
    // const firstName = `${useAuth().user?.user_metadata.first_name}`;
    // const lastName = `${useAuth().user?.user_metadata.last_name}`;
    // const router = useRouter();
    // const { reward } = useReward("rewardId", "confetti");
    // const logout = async () => {
    //     const { error } = await signOut();
    //     if (error) throw error;
    //     router.push("/");
    // };
    // const handleSubmit = (event: React.FormEvent) => {
    //     event.preventDefault();
    //     const currentValidationMessages: String[] = [];
    //     const emptyFields: String[] = [];
    //     Object.entries(registrationData).forEach(([column, value]) => {
    //         if (column === "question_1" && (value === '<p class="mb-1"><br></p>' || value === "")) {
    //             emptyFields.push("Registration Question 1");
    //         } else if (
    //             column === "question_2" &&
    //             (value === '<p class="mb-1"><br></p>' || value === "")
    //         ) {
    //             emptyFields.push("Registration Question 2");
    //         } else if (value === "") {
    //             if (column === "phone_number") emptyFields.push("Phone Number");
    //             else emptyFields.push(column[0].toUpperCase() + column.slice(1));
    //         }
    //     });
    //     emptyFields.forEach((column) => {
    //         currentValidationMessages.push(column + " is empty.");
    //     });
    //     if (currentValidationMessages.length) {
    //         setValidationMessages(currentValidationMessages);
    //         setShowValidationMessages(true);
    //         return;
    //     } else {
    //         setValidationMessages([]);
    //         setShowValidationMessages(false);
    //         supabase
    //             .from("hacker_registrations")
    //             .update({
    //                 status: "Submitted",
    //             })
    //             .eq("id", user?.id)
    //             .then(({ data, error }: { data: any; error: any }) => {
    //                 if (error) {
    //                     alert(
    //                         "Something went wrong with submitting your registration! Please contact the RythmHacks devs."
    //                     );
    //                     throw error;
    //                 }
    //             });
    //         setSubmitted(true);
    //         reward();
    //     }
    // };
    // const updateRegistrationData = (
    //     column: keyof updateHackerRegistrationTableType,
    //     value: string | boolean
    // ) => {
    //     setRegistrationData((appData: updateHackerRegistrationTableType) => ({
    //         ...appData,
    //         [column]: value,
    //     }));
    //     setModifiedRegistrationData((appData: updateHackerRegistrationTableType) => ({
    //         ...appData,
    //         [column]: value,
    //     }));
    // };
    // useEffect(() => {
    //     if (Object.keys(modifiedRegistrationData).length === 0) return;
    //     if (Object.keys(modifiedRegistrationData).length > 0) {
    //         setBasicInfoAutosavingMessage("Saving...");
    //         setSaving(true);
    //     }
    //     const handler = setTimeout(() => {
    //         supabase
    //             .from("hacker_registrations")
    //             .update(modifiedRegistrationData)
    //             .eq("id", user?.id)
    //             .then(({ data, error }: { data: any; error: any }) => {
    //                 if (error) throw error;
    //                 if (basicInfoAutosavingMessage) setBasicInfoAutosavingMessage("Saved!");
    //                 setSaving(false);
    //             });
    //         setModifiedRegistrationData({});
    //     }, 2500);
    //     return () => {
    //         clearTimeout(handler);
    //     };
    // }, [modifiedRegistrationData, supabase, user?.id]);
    // useEffect(() => {
    //     supabase
    //         .from("hacker_registrations")
    //         .select("*")
    //         .eq("id", user?.id)
    //         .then(({ data, error }: { data: any; error: any }) => {
    //             const appData = data?.[0];
    //             if (error || !data || appData === null) {
    //                 setLoading(1);
    //                 alert(
    //                     "Oh no! Your data could not be retrieved. If this error persists, contact the RythmHacks team."
    //                 );
    //                 logout();
    //                 if (error) throw error;
    //                 else throw TypeError("no hacker registration matching the id was found");
    //             } else {
    //                 setRegistrationData(data[0]);
    //                 setLoading(2);
    //             }
    //         });
    // }, [supabase, user?.id]);
    // if (loading === 0) {
    //     return <div className="lazy-preloader"></div>;
    // } else if (loading === 1) {
    //     return (
    //         <div className="container">
    //             <h1>Oh no!</h1>
    //             <p>
    //                 Your data could not be retrieved. Try checking your internet connection. If this
    //                 error persists, contact the RythmHacks team.
    //             </p>
    //         </div>
    //     );
    // } else
    //     return (
    //         <div className="page">
    //             <div className="container text-left justify-start">
    //                 <h1>Hacker Registration Form</h1>
    //                 <p>
    //                     Fill out this form to register for the event as a hacker.{" "}
    //                     <a className="p-0" onClick={() => router.push("/dashboard/register")}>
    //                         Go back to the dashboard.
    //                     </a>{" "}
    //                     <br />
    //                     <br />
    //                     View our{" "}
    //                     <a href="https://www.rythmhacks.ca/documents/privacy.pdf">
    //                         privacy policy.
    //                     </a>
    //                 </p>
    //             </div>
    //             <div className="container mt-4">
    //                 <form onSubmit={handleSubmit} className="hacker-app-form">
    //                     <h3 className="flex flex-col md:flex-row justify-between md:items-center">
    //                         Basic Information
    //                         <p
    //                             className={`flex gap-2 items-center dark:text-dark3 ${
    //                                 !saving ? "bg-[#cef1dd]" : "bg-[#f9eed2]"
    //                             } p-3 transition-colors rounded-md font-normal`}
    //                         >
    //                             {basicInfoAutosavingMessage}{" "}
    //                             {!saving ? (
    //                                 <BsCloudCheck size={20} />
    //                             ) : (
    //                                 <BsCloudArrowUp size={20} />
    //                             )}
    //                         </p>
    //                     </h3>
    //                     <div>
    //                         <label>First Name</label>
    //                         <input
    //                             value={firstName}
    //                             disabled
    //                             className="cursor-not-allowed"
    //                         ></input>
    //                     </div>
    //                     <div>
    //                         <label>Last Name</label>
    //                         <input value={lastName} disabled className="cursor-not-allowed"></input>
    //                     </div>
    //                     <div>
    //                         <label>Email</label>
    //                         <input
    //                             value={user?.email}
    //                             disabled
    //                             className="cursor-not-allowed"
    //                         ></input>
    //                     </div>
    //                     <p className="!text-[#888] mb-4">
    //                         Want to change these values? Do so in the{" "}
    //                         <Link href="/dashboard/settings">settings</Link>
    //                     </p>
    //                     <div>
    //                         <label htmlFor="gender">Gender (optional)</label>
    //                         <select
    //                             id="gender"
    //                             value={
    //                                 ["Prefer not to say", "Male", "Female", "Non-binary"].includes(
    //                                     registrationData.gender || ""
    //                                 )
    //                                     ? registrationData.gender
    //                                     : ""
    //                             }
    //                             onChange={(e) => {
    //                                 updateRegistrationData("gender", e.target.value);
    //                             }}
    //                         >
    //                             <option>Prefer not to say</option>
    //                             <option>Male</option>
    //                             <option>Female</option>
    //                             <option>Non-binary</option>
    //                             <option value="">Prefer to self-describe</option>
    //                         </select>
    //                         {!["Prefer not to say", "Male", "Female", "Non-binary"].includes(
    //                             registrationData.gender || ""
    //                         ) && (
    //                             <>
    //                                 <label htmlFor="self-described-gender">
    //                                     Self-described Gender:
    //                                 </label>
    //                                 <input
    //                                     id="self-described-gender"
    //                                     value={registrationData.gender}
    //                                     onChange={(e) => {
    //                                         updateRegistrationData("gender", e.target.value);
    //                                     }}
    //                                 ></input>
    //                             </>
    //                         )}
    //                     </div>
    //                     <div>
    //                         <label htmlFor="age">Age (as of September 1, 2023)</label>
    //                         <input
    //                             id="age"
    //                             type="number"
    //                             min={0}
    //                             max={200}
    //                             placeholder="Enter age"
    //                             value={registrationData.age}
    //                             onChange={(e) => updateRegistrationData("age", e.target.value)}
    //                         />
    //                     </div>
    //                     <div>
    //                         <label htmlFor="grade">Grade (during the 2023-24 school year)</label>
    //                         <input
    //                             id="grade"
    //                             type="number"
    //                             min={8}
    //                             max={12}
    //                             placeholder="Enter grade"
    //                             value={registrationData.grade}
    //                             onChange={(e) => updateRegistrationData("grade", e.target.value)}
    //                         ></input>
    //                     </div>
    //                     <div>
    //                         <label htmlFor="school">School (don't abbreviate)</label>
    //                         <input
    //                             id="school"
    //                             value={registrationData.school}
    //                             placeholder="Laurel Heights Secondary School"
    //                             onChange={(e) => updateRegistrationData("school", e.target.value)}
    //                         />
    //                     </div>
    //                     <p className="!text-[#888] mb-4">
    //                         Note: only students that are about to enter or are already in high
    //                         school during our event are allowed to attend.
    //                     </p>
    //                     <div>
    //                         <label htmlFor="phone-number">Phone Number</label>
    //                         <input
    //                             id="phone-number"
    //                             type="tel"
    //                             value={registrationData.phone_number}
    //                             placeholder="Enter phone number"
    //                             onChange={(e) =>
    //                                 updateRegistrationData("phone_number", e.target.value)
    //                             }
    //                         ></input>
    //                     </div>
    //                     <div>
    //                         <label htmlFor="country">Country</label>
    //                         <input
    //                             id="country"
    //                             value={registrationData.country}
    //                             placeholder="Enter country"
    //                             onChange={(e) => updateRegistrationData("country", e.target.value)}
    //                         ></input>
    //                     </div>
    //                     {/* <h3>Event-specific Information</h3>
    //         <div>
    //         <label htmlFor="t-shirt-size">T-Shirt Size (optional)</label>
    //         <select
    //             id="t-shirt-size"
    //             value={registrationData.t_shirt_size}
    //             onChange={e => updateRegistrationData('t_shirt_size', e.target.value)}
    //         >
    //             <option>Not Selected</option>
    //             <option>XS</option>
    //             <option>S</option>
    //             <option>M</option>
    //             <option>L</option>
    //             <option>XL</option>
    //         </select>
    //         </div>
    //         <div>
    //         <label>Dietary Restrictions</label>
    //         <div>
    //             <input
    //             type="checkbox"
    //             id="dietary-restrictions-vegetarian"
    //             checked={registrationData.dietary_restrictions_vegetarian}
    //             onChange={e => updateRegistrationData('dietary_restrictions_vegetarian', e.target.checked)} />
    //             <label htmlFor="dietary-restrictions-vegatarian" className="capitalize">Vegetarian</label>
    //         </div>
    //         <div>
    //             <input
    //             type="checkbox"
    //             id="dietary-restrictions-halal"
    //             checked={registrationData.dietary_restrictions_halal}
    //             onChange={e => updateRegistrationData('dietary_restrictions_halal', e.target.checked)} />
    //             <label htmlFor="dietary-restrictions-halal" className="capitalize">Halal</label>
    //         </div>
    //         <div>
    //             <input
    //             type="checkbox"
    //             id="dietary-restrictions-gluten-free"
    //             checked={registrationData.dietary_restrictions_gluten_free}
    //             onChange={e => updateRegistrationData('dietary_restrictions_gluten_free', e.target.checked)} />
    //             <label htmlFor="dietary-restrictions-gluten-free" className="capitalize">Gluten-Free</label>
    //         </div>
    //         <div>
    //             <input
    //             type="checkbox"
    //             id="dietary-restrictions-dairy_free"
    //             checked={registrationData.dietary_restrictions_dairy_free}
    //             onChange={e => updateRegistrationData('dietary_restrictions_dairy_free', e.target.checked)} />
    //             <label htmlFor="dietary-restrictions-dairy-free" className="capitalize">Dairy-Free</label>
    //         </div>
    //         <div>
    //             <input
    //             type="checkbox"
    //             id="other-dietary-restrictions-checkbox"
    //             name="dietary_restrictions"
    //             value={registrationData.dietary_restrictions_other}
    //             onChange={() => setIsOtherDietaryRestrictionChecked(!isOtherDietaryRestrictionChecked)}
    //             ></input>
    //             <label htmlFor="other-dietary-restrictions-checkbox">Other restriction(s)</label>
    //         </div>
    //         {isOtherDietaryRestrictionChecked && (<>
    //             <label htmlFor="other-dietary-restrictions-input">Restriction(s):</label>
    //             <input id="other-dietary-restrictions-input" value={registrationData.dietary_restrictions_other} onChange={e => {
    //                 updateRegistrationData('dietary_restrictions_other', e.target.value)
    //             }}></input>
    //         </>)}
    //         </div> */}
    //                     {/* <h3>Address</h3>
    //         <p>These fields are optional if you want to recieve prizes.</p>
    //         <div>
    //         <input
    //             type="radio"
    //             name="country"
    //             id="canada"
    //             checked={registrationData.country === 'Canada'}
    //             onChange={() => updateRegistrationData('country', 'Canada')}
    //         ></input>
    //         <label htmlFor="canada">Canada</label>
    //         <input
    //             type="radio"
    //             name="country"
    //             id="usa"
    //             checked={registrationData.country === 'United States of America'}
    //             onChange={() => updateRegistrationData('country', 'United States of America')}
    //         ></input>
    //         <label htmlFor="usa">United States</label>
    //         <input
    //             type="radio"
    //             name="country"
    //             id="other-country-checkbox"
    //             checked={registrationData.country !== 'Canada' && registrationData.country !== 'United States of America'}
    //             onChange={() => updateRegistrationData('country', '')}></input>
    //         <label htmlFor="other-country-checkbox">Other</label>
    //         {registrationData.country !== 'Canada' && registrationData.country !== 'United States of America' && (<>
    //             <label htmlFor="other-country-input">Country (No abbrevations):</label>
    //             <input id="other-country-input" value={registrationData.country} onChange={e => {
    //                 updateRegistrationData('country', e.target.value)
    //             }}></input>
    //         </>)}
    //         </div>
    //         <div>
    //         <label htmlFor="province">Province</label>
    //         <input
    //             id="province"
    //             placeholder="Ontario"
    //             value={registrationData.province}
    //             onChange={e => updateRegistrationData('province', e.target.value)}
    //         />
    //         </div>
    //         <div>
    //         <label htmlFor="city">City</label>
    //         <input
    //             id="city"
    //             placeholder="Waterloo"
    //             value={registrationData.city}
    //             onChange={e => updateRegistrationData('city', e.target.value)}
    //         />
    //         </div>
    //         <div>
    //         <label htmlFor="address">Address</label>
    //         <input
    //             id="address"
    //             placeholder="10 Main Street"
    //             value={registrationData.address}
    //             onChange={e => updateRegistrationData('address', e.target.value)}
    //         />
    //         </div>
    //         <div>
    //         <label htmlFor="apartment_suite">Apartment, Suite, etc. (optional)</label>
    //         <input
    //             id="apartment_suite"
    //             placeholder="Unit 4"
    //             value={registrationData.apartment_suite}
    //             onChange={e => updateRegistrationData('apartment_suite', e.target.value)}
    //         />
    //         </div>
    //         <div>
    //         <label htmlFor="postal-code">Postal Code</label>
    //         <input
    //             id="postal-code"
    //             placeholder="N2V 3Q8"
    //             value={registrationData.postal_code}
    //             onChange={e => updateRegistrationData('postal_code', e.target.value)}
    //         />
    //         </div> */}
    //                     <h3 className="mt-12">Registration Questions</h3>
    //                     <h4>
    //                         If you had the ability to create any app/website that would solve any
    //                         problem in the world, what would it be? What technologies would you use?
    //                         What features would it have? (800c)
    //                     </h4>
    //                     <Editor
    //                         initialValue={registrationData.question_1 || ""}
    //                         onEditorChange={(html) => updateRegistrationData("question_1", html)}
    //                     />
    //                     <h4 className="mt-8">
    //                         What's something that you've always wanted to do, but you've never done?
    //                         What roadblocks have you faced that have prevented you from pursuing
    //                         that idea? It could be a new skill you want to learn, a project you want
    //                         to build, a business you want to start, anything you can think of!
    //                         (1000c)
    //                     </h4>
    //                     <Editor
    //                         initialValue={registrationData.question_2 || ""}
    //                         onEditorChange={(html) => updateRegistrationData("question_2", html)}
    //                     />
    //                     <div className="flex gap-2 mt-8">
    //                         <button
    //                             className="contrast"
    //                             onClick={() => navigate("/dashboard/register")}
    //                         >
    //                             Save and return
    //                         </button>
    //                         {registrationData.status !== "Submitted" && (
    //                             <span
    //                                 id="rewardId"
    //                                 style={{
    //                                     width: 2,
    //                                     height: 2,
    //                                     background: "red",
    //                                 }}
    //                             />
    //                         )}
    //                         {registrationData.status !== "Submitted" && (
    //                             <button
    //                                 type="submit"
    //                                 style={{
    //                                     backgroundColor: submitted ? "#64B786" : "#558CA9",
    //                                 }}
    //                             >
    //                                 {!submitted ? "Submit (you can edit it later)" : "Submitted!"}
    //                             </button>
    //                         )}
    //                     </div>
    //                     {validationMessages && (
    //                         <div
    //                             className="mt-4 flex-col text-left !items-start text-dark3"
    //                             style={{
    //                                 display: showValidationMessages ? "flex" : "none",
    //                             }}
    //                         >
    //                             <div className="bg-red-200 p-2 rounded-md !flex-row flex items-center">
    //                                 <AiOutlineWarning size={"24px"} />{" "}
    //                                 <p>
    //                                     Uh oh! Your form has some errors that need to be fixed
    //                                     before submitting.
    //                                 </p>
    //                             </div>
    //                             <div className="flex-col !items-start bg-slate-200 p-2 rounded-md w-full">
    //                                 {validationMessages.map((message, index) => {
    //                                     return <p key={index}>{message}</p>;
    //                                 })}
    //                             </div>
    //                         </div>
    //                     )}
    //                 </form>
    //             </div>
    //         </div>
    // );
};

export default HackerRegistration;
