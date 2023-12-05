import axios from "axios";
import { useState } from "react";

interface UserSearchProps {
  switchMode: boolean;
  setSwitchMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserData {
  login: string;
  avatar_url: string;
  name: string;
  company: string;
  created_at: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string;
}

export default function UserSearch(props: UserSearchProps) {
  const [userName, setUserName] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null | undefined>(null);

  const getUser = async () => {
    try {
      const user = await axios.get(`https://api.github.com/users/${userName}`);
      setUserData(user.data);
    } catch (err) {
      setUserData(undefined);
    }
  };

  const formatCreatedAt = (dateString: string): string => {
    const createdAtDate = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return `${createdAtDate.toLocaleDateString(undefined, options)}`;
  };

  return (
    <div>
      <header className="flex justify-between w-[327px] md:w-[573px] xl:w-[730px]">
        <h1
          className={`text-[26px] font-bold ${
            props.switchMode ? "text-[#222731]" : "text-white"
          }`}
        >
          devfinder
        </h1>
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => {
            props.setSwitchMode(!props.switchMode);
          }}
        >
          <span
            className={`text-[13px] font-bold tracking-[2.5px] ${
              props.switchMode ? "text-[#4B6A9B]" : "text-[#FFF]"
            }`}
          >
            {props.switchMode ? "DARK" : "LIGHT"}
          </span>
          {props.switchMode ? (
            <img src="./assets/moon.svg" />
          ) : (
            <img src="./assets/002-sun.svg" />
          )}
        </div>
      </header>

      <main className="w-[327px] md:w-[573px] xl:w-[730px]">
        <div className="relative mt-9 ">
          <img
            src="./assets/search.svg"
            alt="search"
            className="absolute top-[18px] left-[16px] md:top-[23px] md:left-[32px]"
          />
          <input
            onChange={(event) => setUserName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                getUser();
              }
            }}
            type="text"
            placeholder="Search GitHub username…"
            className={`w-[327px] md:w-[573px] xl:w-[730px] py-4 md:py-5  pl-[45px] md:pl-[80px] pr-[98px] md:pr-[120px] rounded-[15px] text-[18px] font-normal leading-6 placeholder:text-[13px] md:placeholder:text-[18px] outline-none cursor-pointer ${
              props.switchMode
                ? "placeholder-[#4B6A9B]  bg-[#FEFEFE] shadow-1 text-[#222731]"
                : "placeholder-[#FFF] bg-[#1E2A47] text-[#FFF]"
            }`}
          />
          <button
            onClick={getUser}
            className={`absolute top-[5px] left-[230px] 
            md:top-[6px] md:left-[458px] xl:left-[614px] rounded-[10px] text-[14px] md:text-[16px] font-bold px-5 py-3 md:px-[24px] md:py-[14px] text-[#FFF] bg-[#0079FF] md:hover:bg-[#60ABFF]`}
          >
            search
          </button>
          <span
            className="text-[#F74646] font-bold absolute top-[-28px] left-[222px] 
          md:top-[19px] md:left-[347px] xl:left-[495px]"
          >
            {userData === undefined ? "No Results" : ""}
          </span>
        </div>

        <div
          className={`rounded-[15px] px-6 md:px-10 pt-8 md:pt-10 pb-12 md:pb-10 mt-4 xl:py-[48px] xl:pl-[202px] xl:pr-[48px] ${
            props.switchMode ? "  bg-[#FEFEFE] shadow-1" : "bg-[#1E2A47]"
          }`}
        >
          <div className="flex gap-5 md:gap-10 items-center xl:relative">
            <img
              className="w-[70px] h-[70px] md:w-[117px] md:h-[117px] rounded-[1000px] xl:absolute xl:top-[-2px] xl:left-[-158px]"
              src={userData ? userData?.avatar_url : "./assets/Oval.svg"}
              alt="user-icon
            "
            />
            <div className="flex-col xl:flex xl:flex-row xl:justify-between w-full">
              <div>
                <p
                  className={`font-bold md:text-[26px] ${
                    props.switchMode ? " text-[#2B3442]" : "text-[#FFF]"
                  }`}
                >
                  {userData ? userData?.name : "Name"}
                </p>
                <p className="text-[#0079FF] font-normal text-[13px] md:text-[16px]">
                  {userData ? userData?.login : "ID"}
                </p>
              </div>

              <p
                className={`font-normal text-[13px] md:text-[15px] mt-[6px] xl:mt-2 ${
                  props.switchMode ? " text-[#697C9A]" : "text-[#FFF]"
                }`}
              >
                {`Joined: ${
                  userData ? formatCreatedAt(userData.created_at) : ""
                }`}
              </p>
            </div>
          </div>

          <p
            className={`font-normal text-[13px] md:text-[15px] mt-8 md:mt-6 leading-6 ${
              props.switchMode ? " text-[#4B6A9B]" : "text-[#FFF]"
            }`}
          >
            {userData ? userData?.bio : "User Bio"}
          </p>

          <div
            className={`w-[279px] md:w-[493px] rounded-[10px] py-4 md:pr-[96px] md:pl-[32px] xl:pr-[83px] px-7 mt-6 md:mt-8 flex justify-between ${
              props.switchMode ? " bg-[#F6F8FF]" : "bg-[#141D2F]"
            }`}
          >
            <div
              className={` flex flex-col items-center md:items-start gap-[10px] md:gap-[5px] ${
                props.switchMode ? " text-[#4B6A9B]" : "text-[#FFF]"
              }`}
            >
              <p
                className={`font-normal text-[11px] md:text-[13px]  ${
                  props.switchMode ? " text-[#4B6A9B]" : "text-[#FFF]"
                }`}
              >
                Repos
              </p>
              <p
                className={`font-bold md:text-[22px] ${
                  props.switchMode ? " text-[#2B3442]" : "text-[#FFF]"
                }`}
              >
                {userData ? userData?.public_repos : "0"}
              </p>
            </div>

            <div
              className={` flex flex-col items-center gap-[10px] md:gap-[5px] md:items-start ${
                props.switchMode ? " text-[#4B6A9B]" : "text-[#FFF]"
              }`}
            >
              <p
                className={`font-normal text-[11px] md:text-[13px]  ${
                  props.switchMode ? " text-[#4B6A9B]" : "text-[#FFF]"
                }`}
              >
                Followers
              </p>
              <p
                className={`font-bold  md:text-[22px] ${
                  props.switchMode ? " text-[#2B3442]" : "text-[#FFF]"
                }`}
              >
                {userData ? userData?.followers : "0"}
              </p>
            </div>

            <div
              className={` flex flex-col items-center gap-[10px] md:gap-[5px] md:items-start ${
                props.switchMode ? " text-[#4B6A9B]" : "text-[#FFF]"
              }`}
            >
              <p
                className={`font-normal text-[11px]  md:text-[13px] ${
                  props.switchMode ? " text-[#4B6A9B]" : "text-[#FFF]"
                }`}
              >
                Following
              </p>
              <p
                className={`font-bold md:text-[22px] ${
                  props.switchMode ? " text-[#2B3442]" : "text-[#FFF]"
                }`}
              >
                {userData ? userData?.following : "0"}
              </p>
            </div>
          </div>

          <div className="w-full mt-6 grid md:grid-cols-2 md:flex-row gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 ">
                <img src="./assets/003-pin.svg" alt="pin" />
                <p
                  className={`text-[13px] md:text-[13px] font-normal ml-[5px]  ${
                    props.switchMode ? " text-[#4B6A9B]" : "text-[#FFF]"
                  } `}
                >
                  {userData ? userData?.location : "Location"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <img src="./assets/002-url.svg" alt="pin" />
                <p
                  className={`text-[13px] md:text-[13px] font-normal  ${
                    props.switchMode ? " text-[#4B6A9B]" : "text-[#FFF]"
                  } `}
                >
                  {userData ? userData?.blog : "Blog"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 ">
              <div className="flex items-center gap-3">
                <img src="./assets/004-twitter.svg" alt="pin" />
                <a
                  target="_blank"
                  href={`http://twitter.com/${userData?.twitter_username}`}
                  className={`text-[13px] md:text-[13px] font-normal  ${
                    props.switchMode ? " text-[#4B6A9B]" : "text-[#FFF]"
                  } `}
                >
                  {userData ? userData?.twitter_username : "Twitter"}
                </a>
              </div>
              <div className="flex items-center gap-3 ">
                <img src="./assets/001-office-building.svg" alt="pin" />
                <p
                  className={`text-[13px] md:text-[13px] font-normal  ${
                    props.switchMode ? " text-[#4B6A9B]" : "text-[#FFF]"
                  } `}
                >
                  {userData ? userData?.company : "Work place"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
