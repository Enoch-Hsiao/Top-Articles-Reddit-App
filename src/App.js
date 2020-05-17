import React, { useState ,  useEffect}from 'react'
import './App.css';
import Icon from "./icon.js"
import Articles from "./articles.js"
import Banner from "./banner.js"
import Footer from "./footer.js"
import popularIcon from "./icons/popular.png"
import newsIcon from "./icons/news.png"
import scienceIcon from "./icons/science.png"
import musicIcon from "./icons/music.png"
import sportsIcon from "./icons/sports.png"
import gamingIcon from "./icons/gaming.png"
import picsIcon from "./icons/photos.png"

function App() {

  const [articleData, setData] = useState([]);
  const [subredditData, setSubredditData] = useState([]);
  const [numOfEntries, setNumOfEntries] = useState(20);
  const [numOfEntriesText, setNumOfEntriesText] = useState("");
  const [linkArticles, setLinkArticles] = useState("https://www.reddit.com/r/popular/.json?limit=51");
  const [linkInfo, setLinkInfo] = useState("https://www.reddit.com/r/popular/about.json");
  const subredditName = useState("popular");
  const [placeHolderText, setPlaceHolderText] = useState("Enter Subreddit");
  const [placeHolderNum, setPlaceHolderNum] = useState("# of Articles (1-50)");

  const icons = [{key: 1, name: "popular", iconPic: popularIcon},
  {key: 2, name: "worldnews", iconPic: newsIcon},
  {key: 3, name: "science", iconPic: scienceIcon},
  {key: 4, name: "music", iconPic: musicIcon},
  {key: 5, name: "sports", iconPic: sportsIcon},
  {key: 6, name: "gaming", iconPic: gamingIcon},
  {key: 7, name: "pics", iconPic: picsIcon}];

  let [searchBarText, setText] = useState("");
  let getDataArticles = function get(){ fetch(linkArticles)
  .then(response => response.json())
  .then(data => {
    let arr = [];
    if(data !== undefined) {
      let num = numOfEntries;
      if(data.data.children.length < numOfEntries){
        num = data.data.children.length;
      }
      for(let i = 0; i < num; i++){
          arr.push({id: data.data.children[i].data.id,
                    redditlink: data.data.children[i].data.permalink,
                    url: data.data.children[i].data.url,
                    title: data.data.children[i].data.title, 
                    upvotes: data.data.children[i].data.ups,
                    comments: data.data.children[i].data.num_comments,
                    author: data.data.children[i].data.author_fullname,
                    thumbnail: data.data.children[i].data.thumbnail,
                    thumbnail_height: data.data.children[i].data.thumbnail_height,
                    media: data.data.children[i].data.media,
                    is_video: data.data.children[i].data.is_video});
        }
      }
      setData(arr);
    } 
  )};
  
  let getDataSubreddit = function get(){ fetch(linkInfo)
    .then(response => response.json())
    .then(data => {
      if(data !== undefined) {
        let info = null;
        let dataFound = data.message !== "Not Found";
        if(dataFound){
          let backgroundImage = decodeHtml(data.data.banner_background_image);
          let icon = decodeHtml(data.data.community_icon);
          info = {  
                    data: true,
                    name: data.data.display_name,
                    title: data.data.title,
                    background: backgroundImage,
                    icon: icon,
                    icon2: data.data.icon_img,
                    subscribers: data.data.subscribers,
                    description: data.data.public_description,
                    color: data.data.primary_color
                  };
        } else {
          info = {  data: false,
                    name: subredditName };
        }
        setSubredditData(info);
    }
  })};
  
  useEffect(getDataArticles, [linkArticles, numOfEntries]);
  useEffect(getDataSubreddit, [linkArticles]);

  const imageClick = function(event) {
      return () => {
        setLinkInfo("https://www.reddit.com/r/" + event + "/about.json");
        setLinkArticles("https://www.reddit.com/r/" + event + "/.json?limit=51");
    };
  };
  
  function handleChange(event) {
      const {name, value} = event.target;
      if(name === "searchText"){
        setText(value);
      } else if (name === "numOfEntries") {
        setNumOfEntriesText(value);
      }
  }

  function handleSubmit(event) {
      event.preventDefault();
      let newLink = linkArticles;
      let newSubreddit = linkInfo;
      if(searchBarText !== ""){
        newLink = "https://www.reddit.com/r/" + searchBarText + ".json?limit=51"; 
        newSubreddit = "https://www.reddit.com/r/" + searchBarText + "/about.json";
      }
      if(isNaN(numOfEntriesText) || Number(numOfEntriesText) > 50 || Number(numOfEntriesText) < 0){
        setPlaceHolderNum("Insert number between 1-50");
        setNumOfEntriesText("");
        return;
      } else if (numOfEntriesText !== "") {
        newLink = newLink.match(/^(.*?)=/)[0] + numOfEntriesText;
        setNumOfEntries(numOfEntriesText);
      }
      fetch(newLink)
      .then((response) => {
        if (!response.ok) {
          setPlaceHolderText("Subreddit not found")
          setText("");
          return;
        } else {
          setLinkInfo(newSubreddit);
          setLinkArticles(newLink);
        }
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  let articles =  articleData.map(data => 
    <Articles key = {data.id} 
              title = {data.title}
              permalink = {data.redditlink}
              url = {data.url} 
              upvotes = {data.upvotes} 
              comments = {data.comments}
              author = {data.author}
              thumbnail = {data.thumbnail}
              thumbnail_height = {data.thumbnail_height}
              media = {data.media}
              is_video = {data.is_video}
    />);

  let subredditIcons = icons.map(data => 
  <Icon key = {data.key}
        name = {data.name}
        link = {data.iconPic}
        function = {imageClick}
  />);

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

  return (
    <div className="App">
      <Banner data = {subredditData}/>
      <form className="searchBar" onSubmit={handleSubmit}>
          <input 
              type="text"
              name="searchText"
              id="inputField"
              placeholder={placeHolderText}
              value={searchBarText}
              onChange={handleChange}
          />
          <input 
            type="text"
            name="numOfEntries"
            id="inputField"
            placeholder={placeHolderNum}
            value={numOfEntriesText}
            onChange={handleChange}
          />
          <button>Search</button>
      </form>
      <div className = "row">
        {subredditIcons}
      </div>
      {articles}
      <Footer />
    </div>
  );
}


export default App;