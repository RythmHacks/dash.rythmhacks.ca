import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { BsDiscord } from "react-icons/bs";
import { useStatus } from "../../contexts/UserStatus";

const Discord = () => {
  const { user } = useAuth();

  const status = useStatus();

  const navigate = useNavigate();

  if (status !== "Confirmed") {
    navigate("/dashboard");
  }

  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code");

  const [loadingState, setLoadingState] = useState<
    "loading" | "success" | "error"
  >("success");
  const [result, setResult] = useState<any>();
  const [error, setError] = useState<Error>();

  if (code) {
    useEffect(() => {
      setLoadingState("loading");
      fetch(import.meta.env.VITE_BACKEND_URL + "/join-discord", {
        method: "POST",
        body: JSON.stringify({
          code,
          supabase_user_id: user?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      })
        .then(async (res) => {
          const json = await res.json();
          if (!res.ok) throw json;
          return json;
        })
        .then((json: object) => {
          setLoadingState("success");
          setResult(json);
        })
        .catch((errorResponse: any) => {
          const newError = new Error(
            `${errorResponse.status} ${errorResponse.message}`
          );
          setLoadingState("error");
          setError(newError);
          console.error(errorResponse);
        });
    }, []);
  }

  if (loadingState === "loading") return <div className="lazy-preloader"></div>;
  else if (loadingState === "error") {
    let message = "";
    console.log(error);
    if (error && error.message === "400 Invalid code.") {
      message = `Your Discord authorization code is invalid. This is usually due to one of two reasons: the code expired, or you've joined the server and the code has been used already. Click the Discord tab in the sidebar and you should be good! If not, contact the RythmHacks devs.`;
    }
    return (
      <div className="page">
        <div className="container">
          <h1>
            An error occured and you could not have been added to the server!
          </h1>
          <p>{message || `Message: ${error?.message}`}</p>

          <p>
            Feel free to contact us at{" "}
            <a href="mailto:rythmhacks@gmail.com">rythmhacks@gmail.com</a> for
            more assistance.
          </p>
        </div>
      </div>
    );
  } else if (user?.user_metadata.joined_discord || result) {
    if (
      result &&
      result.message === "User successfully added to Discord server."
    ) {
      return (
        <div className="page">
          <div className="container">
            <h1>Success!</h1>
            <p>
              Success! You've been added to the Discord server. Now, head over
              to the Discord website or app and begin chatting!
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="page">
        <div className="container">
          <h1>Well darn</h1>
          <p>You've already joined the Discord.</p>
        </div>
      </div>
    );
  } else {
    const discordOAuth2Link = encodeURI(
      "https://discord.com/api/oauth2/authorize?" +
        `client_id=1086480799961976923` +
        `&redirect_uri=${window.location.href}` +
        "&response_type=code" +
        "&scope=identify guilds.join"
    );

    return (
      <div className="page">
        <div className="container">
          <h1>Join the Discord</h1>
          <p>
            Join the RythmHacks Discord server and start talking to your fellow
            hackers! If you've already joined the Discord, you don't need to do
            anything.
          </p>
        </div>
        <div className="container mt-4">
          <p>
            Press this button to authorize your Discord account and join the
            server.{" "}
          </p>
          <a
            className="style-none text-white bg-[#5865F2] transition-colors px-4 py-2 rounded-md no-underline flex items-center gap-2 w-48 hover:bg-[#4f5bda] mt-4"
            href={discordOAuth2Link}
          >
            <BsDiscord size="24" />
            Join the Discord
          </a>
        </div>
      </div>
    );
  }
};

export default Discord;
