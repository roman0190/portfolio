"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl,tag="Game" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4">
      {/* Image Container */}
      <div className="h-56 md:h-96 rounded-t-xl relative group bg-slate-400/10">
        <Image
          src={imgUrl}
          alt={`${title} Thumbnail`}
          width={1080}
          height={1080}
          className="w-full h-full object-contain rounded-t-xl"
          priority={true} // Preload the image if it's above the fold
          placeholder="blur" // Use blur-up effect until the image is fully loaded
          blurDataURL={imgUrl} // Add a low-quality placeholder image URL
        />
        {/* Overlay */}
        <div className="overlay items-center justify-center absolute h-full w-full bg-slate-400 top-0 left-0 rounded-t-xl hidden bg-opacity-0 group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
          <Link
            href={gitUrl}
            aria-label={`View ${title} Code`}
            className="m-2 h-11 w-28 flex justify-center border-2 rounded-full border-[#0987e1] hover:border-white transition duration-300"
          >
            <p className="text-[#0987e1] group-hover:text-white m-2">
              View Code
            </p>
          </Link>

          <Link
            href={previewUrl}
            aria-label={
              tag.includes("Game")
                ? `Watch ${title} Demo`
                : `Preview ${title} Site`
            }
            className="h-11 w-36 flex justify-center border-2 rounded-full border-[#0987e1] hover:border-white transition duration-300"
          >
            <p className="text-[#0987e1] group-hover:text-white m-2">
              {tag.includes("Game") ? "Watch Demo" : "Preview Site"}
            </p>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="text-white rounded-b-xl bg-[#181818] py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p
          className={`text-[#ADB7BE] ${!isExpanded ? "line-clamp-1" : ""}`}
          style={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: isExpanded ? "unset" : "1",
            transition: "max-height 0.3s ease",
          }}
        >
          {description}
        </p>
        <button
          className="text-blue-500 mt-2 hover:underline"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={
            isExpanded ? "Show Less Description" : "Show More Description"
          }
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
