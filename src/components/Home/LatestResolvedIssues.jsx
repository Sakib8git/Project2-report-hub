import React from "react";

import ResolveCard from "./ResolveCard";

const LatestResolvedIssues = () => {
  
  return (
    <div className="container mx-auto px-4 pb-8">
      <h2 className=" text-2xl md:text-3xl custom-heading mt-10 ">
        Latest Resolved Issue
      </h2>

      <ResolveCard></ResolveCard>
    </div>
  );
};

export default LatestResolvedIssues;
