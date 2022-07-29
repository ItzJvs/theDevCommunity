import { NavLink } from "react-router-dom";
import { Button } from "../navbar";
import axios from "axios";

// Images Imported..
import home from "../../assets/icons/home.png";
import Listings from "../../assets/icons/listing.png";
import Prodcasts from "../../assets/icons/prodcast.png";
import Videos from "../../assets/icons/videos.png";
import Tags from "../../assets/icons/tag.png";
import FAQ from "../../assets/icons/faq.png";
import ForemShop from "../../assets/icons/foremshop.png";
import Sponsors from "../../assets/icons/heart.png";
import About from "../../assets/icons/about.png";
import Contact from "../../assets/icons/contact.png";
import Guides from "../../assets/icons/guide-book.png";
import Softwarecomparisons from "../../assets/icons/thinking.png";
import CodeofConduct from "../../assets/icons/thumbs.png";
import PrivacyPolicy from "../../assets/icons/goggleemoji.png";
import Termsofuse from "../../assets/icons/eyes.png";
//
import tweeter from "../../assets/icons/tweeter.png";
import facebook from "../../assets/icons/facebook.png";
import instagram from "../../assets/icons/instagram.png";
import github from "../../assets/icons/github.png";
import twitch from "../../assets/icons/twitch.png";
import assetTemp from "../../assets/asset-temp.png";
import foremTemp from "../../assets/foremTemp.png";
import postTempImage from "../../assets/postTempImg.jpg";
import { useEffect, useState } from "react";
import { getAllPostsUrl, getAllUsersUrl } from "../../endpoints";

// --------------------------------------------------------LeftColPart..

let WelcomeCard = () => {
  let [allUsers, setAllUsers] = useState(0);
  useEffect(() => {
    async function getData() {
      let data = await axios.get(getAllUsersUrl);
      setAllUsers(data.data);
      return data;
    }
    getData();
  }, []);
  return (
    <div className="welcomeCard">
      <span className="welcomeDesc">
        <span className="communitySpan"> DEV Community </span> is a Community of
        <br /> {allUsers.totalUsers} amazing developers
      </span>
      <span> We're a place where coders share, stay up-to-date and grow their careers.</span>
      <Button type="register" />
      <Button type="login" />
    </div>
  );
};
const LinkText = ({ text, path, image }) => {
  return (
    <NavLink to={path} className="LinkText">
      {image ? <img src={image} alt="img" /> : null}
      {text}
    </NavLink>
  );
};

const VerticalNavbar = () => {
  let VerticalListItems = [
    { img: home, text: "Home", path: "/" },
    { img: Listings, text: "Listings", path: "listings" },
    { img: Prodcasts, text: "Prodcasts", path: "prodcasts" },
    { img: Videos, text: "Videos", path: "videos" },
    { img: Tags, text: "Tags", path: "tags" },
    { img: FAQ, text: "FAQ", path: "faq" },
    { img: ForemShop, text: "Forem Shop", path: "foremshop" },
    { img: Sponsors, text: "Sponsors", path: "sponsors" },
    { img: About, text: "About", path: "about" },
    { img: Contact, text: "Contact", path: "contact" },
    { img: Guides, text: "Guides", path: "guides" },
    { img: Softwarecomparisons, text: "Software comparisons", path: "softcomparison" },
    { img: CodeofConduct, text: "Code of Conduct", path: "COC" },
    { img: PrivacyPolicy, text: "Privacy Policy", path: "privacyPolicy" },
    { img: Termsofuse, text: "Terms of use", path: "terms" },
  ];
  return (
    <div className="verticalNavbar">
      {VerticalListItems.map((Item, index) => {
        const Other = () => <b> Other</b>;
        return (
          <span key={index} className="VerticalListItem">
            {Item.path === "softcomparison" ? <Other /> : null}
            <LinkText text={Item.text} path={Item.path} image={Item.img} />
          </span>
        );
      })}
      <div className="SocialMedias">
        <LinkText path={"https://instagram.com/thepracticaldev"} image={tweeter} />
        <LinkText path={"tweeter"} image={facebook} />
        <LinkText path={"tweeter"} image={github} />
        <LinkText path={"tweeter"} image={instagram} />
        <LinkText path={"tweeter"} image={twitch} />
      </div>
    </div>
  );
};

const TagsCard = () => {
  let allTags = [
    { tag: "programming" },
    { tag: "tutorial" },
    { tag: "react" },
    { tag: "python" },
    { tag: "productivity" },
    { tag: "discuss" },
    { tag: "css" },
    { tag: "devops" },
    { tag: "career" },
    { tag: "opensource" },
    { tag: "html" },
    { tag: "aws" },
    { tag: "node" },
    { tag: "news" },
    { tag: "codenewbie" },
    { tag: "typescript" },
    { tag: "android" },
    { tag: "showdev" },
    { tag: "java" },
    { tag: "php" },
    { tag: "testing" },
    { tag: "cloud" },
    { tag: "github" },
    { tag: "blockchain" },
    { tag: "angular" },
    { tag: "security" },
    { tag: "laravel" },
  ];

  return (
    <div className="tagsCard">
      {allTags.map((Item, index) => {
        return (
          <span key={index}>
            <LinkText text={"#" + Item.tag} path={"tag/" + Item.tag} />
          </span>
        );
      })}
    </div>
  );
};

const ImageCard = ({ image, title, subtitle, path }) => {
  return (
    <div className="imageCard">
      <NavLink to={path}>{image ? <img src={image} alt="imageCardImage" /> : null}</NavLink>
      <NavLink to={path}>{title ? <span className="title">{title}</span> : null}</NavLink>
      {subtitle ? <span className="subTitle">{subtitle}</span> : null}
    </div>
  );
};

const VerticalNavAndFilter = () => {
  return (
    <div className="verticalNavAndFiler">
      <WelcomeCard />
      <VerticalNavbar />
      <b>Popular Tags</b>
      <TagsCard />
      <ImageCard image={assetTemp} title="TempTitle" subtitle="TempSubTitle.." path="Path" />
      <ImageCard image={foremTemp} title="The Forem Shop is Here!" subtitle=">> Shop Forem, DEV, and CodeNewbie merch" path="Path" />
    </div>
  );
};

// --------------------------------------------------------FeedPart..
const FeedFilters = () => {
  return (
    <div className="feedFilters">
      <div className="typeFilters">
        <span className="active">Relevent</span>
        <span>Latest</span>
        <span>Top</span>
      </div>
      <div className="timeFilters">
        <span>Week</span>
        <span>Month</span>
        <span>Year</span>
        <span className="active">Infinity</span>
      </div>
    </div>
  );
};
const Post = ({ image, title, user, tags, time, reactions, comments }) => {
  return (
    <div className="post">
      {image ? <img src={image} /> : null}
      <div className="info">
        <img src={user.image} />
        <span>
          <span className="username"> {user.username}</span> <br /> <span className="postTime">{time}</span>
        </span>
      </div>
      <span className="postTitle"> {title}</span>
      {/* tags array */}
      <span className="postTags">
        {tags.map((tag, index) => {
          return <LinkText key={index} path={tag} text={"#" + tag} />;
        })}
      </span>
      <span className="reactionsAndComments">
        <span>
          <span>
            {/* reactions logo */} {reactions} reactions
          </span>
          <span>
            {/* comments logo */} {comments} comments
          </span>
        </span>
        <span className="save">
          <span className="saveSpan"> Save</span>
        </span>
      </span>
    </div>
  );
};
const FeedCol = () => {
  let [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    async function getData() {
      let posts = await axios.get(getAllPostsUrl);
      setAllPosts(posts.data.posts);
      return posts;
    }
    getData();
  }, []);

  return (
    <div className="feedCol">
      <FeedFilters />
      {allPosts.map((post, index) => {
        console.log(post);
        let user = post.user;
        return (
          <span key={post._id}>
            <Post
              image={postTempImage}
              comments={post.comments.length}
              reactions={post.reactions.length}
              tags={post.tags}
              user={{ username: user.username, image: user.profileImage }}
              time="6 Jul"
              title={post.title}
            />
          </span>
        );
      })}
    </div>
  );
};

export { VerticalNavAndFilter, FeedCol, LinkText };
