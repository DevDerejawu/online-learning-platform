import Link from "next/link";
import FramerMotionClientWraper from "../clientComponents/framerMotionClientWraper";

const Copyright = () => {
  return (
    <FramerMotionClientWraper
      initialX={-450}
      initialY={null}
      tag="div"
      className="py-4 text-center border-t mt-6 border-slate-700"
    >
      <p>
        Copyright 2026 ©{" "}
        <Link href="/">
          DevDerejawu(LearningHub)
        </Link>{" "}
        All Right Reserved.
      </p>
    </FramerMotionClientWraper>
  );
};

export default Copyright;
