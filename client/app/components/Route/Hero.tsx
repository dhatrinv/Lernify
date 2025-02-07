"use client";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // For scroll animations

type Props = {};

const Hero: FC<Props> = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search !== "") {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center relative px-4 lg:px-0">
      {/* Left Section: Circular Animation with Image */}
      <motion.div
        className="relative w-full lg:w-1/2 h-full flex items-center justify-center mb-8 lg:mb-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute w-[60vw] h-[60vw] lg:w-[70vh] lg:h-[70vh] hero_animation rounded-full z-0"></div>
        <Image
          src={require("../../../public/assests/banner-img-1.png")}
          alt="hero"
          className="object-contain max-w-[60%] lg:max-w-[70%] z-10 relative"
          loading="lazy"
        />
      </motion.div>

      {/* Right Section: Text */}
      <motion.div
        className="w-full lg:w-1/2 h-full flex flex-col justify-center items-start p-4 lg:p-8 text-center lg:text-left"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-[#000000c7] dark:text-white text-[36px] lg:text-[38px] xl:text-[50px] font-[900] leading-snug lg:leading-[45px] xl:leading-[55px] mb-9 font-Josefin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="block">Improve Your Online</span>
          <span className="block">Learning Experience</span>
          <span className="block">Instantly</span>
        </motion.h2>

        <motion.p
          className="text-[#000000ac] dark:text-[#edfff4] font-Josefin font-[500] text-[16px] lg:text-[18px] mb-9"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          We have 40k+ online courses and 500k+ registered students. Find your desired courses from them.
        </motion.p>

        {/* Search Input */}
        <motion.div
          className="w-full max-w-md h-[45px] lg:h-[50px] bg-transparent relative mx-auto lg:mx-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <input
            type="search"
            placeholder="Search Courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[16px] lg:text-[20px] font-[500] font-Josefin"
          />
          <motion.div
            onClick={handleSearch}
            className="absolute flex items-center justify-center w-[45px] lg:w-[50px] h-full right-0 top-0 bg-[#39c1f3] rounded-r-[5px] cursor-pointer hover:bg-[#2c97b9] transition-all"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <BiSearch className="text-white text-xl lg:text-2xl" />
          </motion.div>
        </motion.div>

        {/* Client Section */}
        <motion.div
          className="flex items-center justify-center lg:justify-start mt-6 lg:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div
            className="rounded-full w-[35px] h-[35px] lg:w-[40px] lg:h-[40px]"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={require("../../../public/assests/client-1.jpg")}
              alt="client 1"
              className="rounded-full"
            />
          </motion.div>
          <motion.div
            className="rounded-full w-[35px] h-[35px] lg:w-[40px] lg:h-[40px] -ml-3"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={require("../../../public/assests/client-2.jpg")}
              alt="client 2"
              className="rounded-full"
            />
          </motion.div>
          <motion.div
            className="rounded-full w-[35px] h-[35px] lg:w-[40px] lg:h-[40px] -ml-3"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={require("../../../public/assests/client-3.jpg")}
              alt="client 3"
              className="rounded-full"
            />
          </motion.div>
          <motion.p
            className="font-Josefin dark:text-[#edfff4] text-[#000000b3] pl-3 text-[14px] lg:text-[16px] font-[600]"
            whileHover={{ color: "#46e256" }}
            transition={{ duration: 0.3 }}
          >
            500K+ People already trusted us.{" "}
            <Link href="/courses" className="dark:text-[#46e256] text-[crimson] hover:underline transition-all">
              View Courses
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
