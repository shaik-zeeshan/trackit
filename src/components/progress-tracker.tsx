"use client";

import { BookmarkIcon, CheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useInView } from "framer-motion";
import {
  clearProgress,
  getProgress,
  trackProgress,
} from "@/lib/actions/blog-progress";
import { useEffect, useRef } from "react";
import { toast } from "./ui/use-toast";

export const ProgressTracker = () => {
  const ref = useRef(null);

  const isInView = useInView(ref);

  useEffect(() => {
    (async () => {
      const data = await getProgress();
      if (typeof data === "number") {
        window.scrollTo({
          top: getScrollPixel(data),
          behavior: "smooth",
        });
      }
    })();
  }, []);

  function getScrollPercent() {
    var h = document.documentElement,
      b = document.body;
    return (
      ((h.scrollTop || b.scrollTop) /
        ((h.scrollHeight || b.scrollHeight) - h.clientHeight)) *
      100
    );
  }
  function getScrollPixel(progress: number) {
    let unit = document.documentElement.scrollHeight / 100;
    return progress * unit;
  }

  return (
    <>
      {!isInView ? (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-5 right-5"
          onClick={async () => {
            const progress = await trackProgress(getScrollPercent());

            console.log(progress);
          }}
        >
          <BookmarkIcon className="w-5 h-5" />
        </Button>
      ) : (
        <>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-5 right-5"
            onClick={async () => {
              const data = await clearProgress();
              toast({
                title: data.title,
                description: data.message,
              });
            }}
          >
            <CheckIcon className="w-5 h-5" />
          </Button>
        </>
      )}
      <div ref={ref} className="opacity-0 w-0 h-0" />
    </>
  );
};
