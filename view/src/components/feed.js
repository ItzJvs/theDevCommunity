import { FeedCol, VerticalNavAndFilter } from "./Cards/leftColCards";
import { Button } from "./navbar";

const Feed = () => {
  return (
    <div className="content">
      <div className="leftCol">
        <VerticalNavAndFilter />
      </div>
      <div className="feed">
        <FeedCol />
      </div>
      <div className="rightCol">col 3 </div>
    </div>
  );
};

export default Feed;
