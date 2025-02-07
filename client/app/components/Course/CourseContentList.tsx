import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useGenerateCertificateMutation } from '../../../redux/features/courses/coursesApi';

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
  courseId?: string; // Add this
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(
    new Set<string>()
  );
  const router = useRouter();

  const videoSections: string[] = [
    ...new Set<string>(props.data?.map((item: any) => item.videoSection)),
  ];

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  const markAsCompleted = (videoId: string) => {
    setCompletedVideos((prev) => new Set(prev).add(videoId));
  };

  const allVideosCompleted = props.data.every((video: any) =>
    completedVideos.has(video._id)
  );

  const params = useParams();
const courseId = params?.courseId || "675d9969cf8f742f360a97a2";


  // Use the generateCertificate mutation hook
  const [generateCertificate, { isLoading }] = useGenerateCertificateMutation();

  const handleGenerateCertificate = async () => {
    if (!courseId) {
      toast.error("Course ID not found!");
      return;
    }

    try {
      const response = await generateCertificate(courseId).unwrap();
      toast.success(response.message);
      console.log("Download Link:", response.downloadLink);
      router.push("/"); // Redirect to the home page
    } catch (err: any) {
      console.error("Error generating certificate:", err);
      toast.error(err?.message || "Failed to generate certificate");
    }
  };

  return (
    <div className={`mt-[15px] w-full ${!props.isDemo && 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30'}`}>
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);

        const sectionVideos: any[] = props.data.filter(
          (item: any) => item.videoSection === section
        );

        const sectionVideoCount: number = sectionVideos.length;
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );
        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;

        const sectionContentHours: number = sectionVideoLength / 60;

        return (
          <div className={`${!props.isDemo && 'border-b border-[#0000001c] dark:border-[#ffffff8e] pb-2'}`} key={section}>
            <div className="w-full flex">
              <div className="w-full flex justify-between items-center">
                <h2 className="text-[22px] text-black dark:text-white">{section}</h2>
                <button
                  className="mr-4 cursor-pointer text-black dark:text-white"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} />
                  ) : (
                    <BsChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>
            <h5 className="text-black dark:text-white">
              {sectionVideoCount} Lessons ·{" "}
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionContentHours.toFixed(2)}{" "}
              {sectionVideoLength > 60 ? "hours" : "minutes"}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentLength: number = item.videoLength / 60;

                  return (
                    <div
                      className={`w-full ${
                        videoIndex === props.activeVideo ? "bg-slate-800" : ""
                      } cursor-pointer transition-all p-2`}
                      key={item._id}
                      onClick={() => {
                        if (!props.isDemo) {
                          props?.setActiveVideo(videoIndex);
                          markAsCompleted(item._id); // Mark video as completed
                        }
                      }}
                    >
                      <div className="flex items-start">
                        <div>
                          <MdOutlineOndemandVideo
                            size={25}
                            className="mr-2"
                            color="#1cdada"
                          />
                        </div>
                        <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
                          {item.title}
                        </h1>
                      </div>
                      <h5 className="pl-8 text-black dark:text-white">
                        {item.videoLength > 60
                          ? contentLength.toFixed(2)
                          : item.videoLength}{" "}
                        {item.videoLength > 60 ? "hours" : "minutes"}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      {/* Generate Certificate Button */}
      <div className="mt-4">
        <button
          onClick={handleGenerateCertificate}
          disabled={isLoading || !allVideosCompleted}
          className={`px-4 py-2 rounded ${isLoading || !allVideosCompleted ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          {isLoading ? "Generating..." : allVideosCompleted ? "Generate Certificate" : "Complete All Videos to Unlock"}
        </button>
      </div>
    </div>
  );
};

export default CourseContentList;
