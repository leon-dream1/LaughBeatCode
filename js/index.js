const loadAllPost = async (category) => {
  let res;
  const spinner = document.getElementById("post_spinner");
  if (category) {
    document.getElementById("post-container").innerHTML = "";
    spinner.classList.remove("hidden");
    res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
    );
  } else {
    res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
  }

  const data = await res.json();
  // console.log(data.posts);

  const postContainer = document.getElementById("post-container");
  data.posts.forEach((post) => {
    // console.log(post);
    const div = document.createElement("div");
    div.id = post.id;
    div.innerHTML = `<div
    class="post flex flex-col lg:flex-row mb-5 bg-[#F3F3F5] rounded-[24px] p-[15px] lg:p-[40px] lg:gap-[24px]"
  >
    <div class="relative">
      <img
        class="h-[72px] w-[72px] mx-auto lg:mx-0 bg-white rounded-2xl"
        src=${post.image}
        alt=""
      />
      <div class="${
        post.isActive ? "bg-[#10B981]" : "bg-[#FF3434]"
      } rounded-full w-[20px] h-[20px] absolute top-[-4px] md:top-[-4px] lg:top-[-5px] right-[39%] md:right-[44%] lg:right-[-5px]"></div>
    </div>
    <div class="w-[100%] space-y-4">
      <div class="flex flex-col text-center lg:text-start lg:flex-row gap-3 lg:gap-8">
        <h4
          class="text-[#12132DCC] text-[14px] font-inter font-medium"
        >
          #${post.category}
        </h4>
        <h4
          class="text-[#12132DCC] text-[14px] font-inter font-medium"
        >
          Author : ${post.author.name}
        </h4>
      </div>
      <h2 class="text-[#12132D] text-center lg:text-start text-[16px] lg:text-[20px] font-bold">
        ${post.title}
      </h2>
      <p
        class=" text-[#12132D99] text-[16px] text-center lg:text-start font-inter font-normal border-b border-dashed border-[#12132D40] pb-4"
      >
        ${post.description}
      </p>
      <div class="flex flex-col lg:flex-row lg:justify-between pt-4">
        <div class="icon flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-16">
          <div>
            <div class="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4">
              <img class="w-[20%] lg:w-[100%] mx-auto lg:mx-0" src="./images/comment.png" alt="" />
            <span class="text-[16px] text-[#12132D99] font-normal font-inter text-center lg:text-start">${
              post.comment_count
            }</span>
            </div>
          </div>
          <div>
            <div class="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4">
              <img class="w-[20%] lg:w-[100%] mx-auto lg:mx-0" src="./images/eye.png" alt="" />
              <span class="text-[16px] text-[#12132D99] font-normal font-inter text-center lg:text-start"> ${
                post.view_count
              }</span>
            </div>
          </div>
          <div>
            <div class="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-4">
              <img class="w-[20%] lg:w-[100%] mx-auto lg:mx-0" src="./images/clock.png" alt="" />
              <span class="text-[16px] text-[#12132D99] font-normal font-inter text-center lg:text-start">${
                post.posted_time
              }</span>
            </div>
          </div>
        </div>
        <div class='mt-[30px]'>
          <img onclick="addReadPost(${post.id}, '${post.title.replace(
      /'/g,
      "@"
    )}', ${
      post.view_count
    })" class='cursor-pointer w-[20%] lg:w-[100%] mx-auto' src="./images/email.png" alt="" />
        </div>
      </div>
    </div>
  </div>`;

    setTimeout(() => {
      spinner.classList.add("hidden");
    }, 2000);

    setTimeout(() => {
      postContainer.appendChild(div);
    }, 2000);
  });
};
loadAllPost();

const searchedPost = () => {
  const searchedPost = document.getElementById("search-post").value;
  // console.log(searchedPost);
  loadAllPost(searchedPost);
  document.getElementById("search-post").value = "";
};

const addReadPost = (postId, postTitle, postViewCount) => {
  // console.log(postId, postTitle.replace("@", `'`), postViewCount);
  const markAsReadContainer = document.getElementById("mark-as-read-container");
  const div = document.createElement("div");
  div.innerHTML = `<div class="bg-white rounded-[16px] p-[10px] lg:p-[15px]">
  <div class="flex flex-row items-center justify-between">
    <h4 class='text-[14px]'>${postTitle.replace("@", `'`)}</h4>
    <div class="flex flex-row gap-1 lg:gap-4">
      <img
        class="w-[28px] h-[28px]"
        src="./images/eye.png"
        alt=""
      />
      <p>${postViewCount}</p>
    </div>
  </div>
</div>
  `;
  markAsReadContainer.appendChild(div);
  const countReadPost = parseInt(
    document.getElementById("count-read-post").innerText
  );
  document.getElementById("count-read-post").innerText = countReadPost + 1;
};

const loadLatestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  // console.log(data);

  const latestPostContainer = document.getElementById("latest-post-container");
  data.forEach((latestPost) => {
    const div = document.createElement("div");
    div.innerHTML = `<div
     class="bg-white border border-[#12132D26] rounded-[24px] p-[20px] space-y-6 m-2 lg:m-0"
   >
     <img class='rounded-[20px]' src=${latestPost.cover_image} alt="" />
     <div class="flex flex-row gap-6">
       <img
         class="w-[24px] h-[24px]"
         src="./images/calender.png"
         alt=""
       />
       <p class="text-[#12132D99] text-[16px] font-normal">${
         latestPost.author.posted_date
           ? `${latestPost.author.posted_date}`
           : `No publish date`
       }</p>
     </div>
     <h3 class="text-[#12132D] text-[18px] font-extrabold">
       ${latestPost.title}
     </h3>
     <p class="text-[#12132D99] text-[16px] font-normal w-[100%]">
      ${latestPost.description}
     </p>
     <div class="flex flex-row gap-6">
       <img class="w-[44px] h-[44px] rounded-[44px]" src=${
         latestPost.profile_image
       } alt="" />
       <div class="">
         <h4 class="text-[16px] text-[#12132D] font-bold">${
           latestPost.author.name
         }</h4>
         <p>${
           latestPost.author.designation
             ? `${latestPost.author.designation}`
             : `Unknown`
         }</p>
       </div>
     </div>
   </div>`;

    const spinner = document.getElementById("latest_spinner");
    setTimeout(() => {
      spinner.classList.add("hidden");
    }, 2000);

    setTimeout(() => {
      latestPostContainer.appendChild(div);
    }, 2000);
  });
};
loadLatestPost();
