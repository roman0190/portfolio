'use client'
import React,{useState} from "react";
import Link from "next/link";
import Image from "next/image";
const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="mt-4">
      <div
        className="h-56 md:h-96 rounded-t-xl relative group bg-slate-400/10"
        style={{
          // background: `url(${imgUrl})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Image src={imgUrl} alt="alt" width={1080} height={1080} className="w-full h-full object-contain" />
        <div className="overlay items-center justify-center absolute h-full w-full bg-slate-400 top-0 left-0 rounded-t-xl hidden bg-opacity-0 group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
          <Link
            href={gitUrl}
            className="m-2 h-11 w-28 flex justify-center border-2 relative rounded-full border-[#0987e1] hover:border-white group/link"
          >
            <p className=" text-[#0987e1] cursor-pointer group-hover/link:text-white m-2 ">
              View Code
            </p>
          </Link>
          <Link
            href={previewUrl}
            className="h-11 w-36 flex justify-center border-2 relative rounded-full border-[#0987e1] hover:border-white group/link"
          >
            <p className=" text-[#0987e1] cursor-pointer group-hover/link:text-white m-2 ">
              Preview Site
            </p>
          </Link>
        </div>
      </div>
      <div className="text-white rounded-b-xl bg-[#181818] py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p
          className={`text-[#ADB7BE] ${!isExpanded ? "line-clamp-1" : ""}`}
          style={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
        <button
          className="text-blue-500 mt-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
