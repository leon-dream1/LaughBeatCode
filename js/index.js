const loadAllPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();

  const postContainer = document.getElementById("post-container");
  data.posts.forEach((post) => {
    console.log(post);
    const div = document.createElement("div");
    div.id = post.id;
    div.innerHTML = `<div
    class="post flex flex-row mb-5 bg-[#F3F3F5] rounded-[24px] p-[40px] gap-[24px]"
  >
    <div class="relative">
      <img
        class="h-[72px] w-[72px] bg-white rounded-2xl"
        src=${post.image}
        alt=""
      />
      <div class="${post.isActive ? 'bg-[#10B981]': 'bg-[#FF3434]'} rounded-full w-[20px] h-[20px] absolute top-[-5px] right-[-5px]"></div>
    </div>
    <div class="w-[100%] space-y-4">
      <div class="flex gap-8">
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
      <h2 class="text-[#12132D] text-[20px] font-bold">
        ${post.title}
      </h2>
      <p
        class=" text-[#12132D99] text-[16px] font-inter font-normal border-b border-dashed border-[#12132D40] pb-4"
      >
        ${post.description}
      </p>
      <div class="flex justify-between pt-4">
        <div class="icon flex space-x-16">
          <div>
            <div class="flex space-x-4">
              <img class="" src="./images/comment.png" alt="" />
            <span class="text-[16px] text-[#12132D99] font-normal font-inter">${post.comment_count}</span>
            </div>
          </div>
          <div>
            <div class="flex space-x-4">
              <img src="./images/eye.png" alt="" />
              <span class="text-[16px] text-[#12132D99] font-normal font-inter"> ${post.view_count}</span>
            </div>
          </div>
          <div>
            <div class="flex space-x-4">
              <img src="./images/clock.png" alt="" />
              <span class="text-[16px] text-[#12132D99] font-normal font-inter">${post.posted_time}</span>
            </div>
          </div>
        </div>
        <div class="">
          <img onclick="addReadPost(${post.id}, '${post.title}', ${
            post.view_count
          })" class='cursor-pointer' src="./images/email.png" alt="" />
        </div>
      </div>
    </div>
  </div>`;

    postContainer.appendChild(div);
  });
};
loadAllPost();


const addReadPost = (postId, postTitle, postViewCount) => {
  console.log(postId, postTitle, postViewCount);
  const markAsReadContainer = document.getElementById("mark-as-read-container");
  const div = document.createElement('div');
  div.innerHTML = `<div class="bg-white rounded-[16px] p-[15px]">
  <div class="flex justify-between">
    <h4>${postTitle}</h4>
    <div class="flex gap-4">
      <img
        class="w-[28px] h-[28px]"
        src="./images/eye.png"
        alt=""
      />
      <p>${postViewCount}</p>
    </div>
  </div>
</div>
  `
  markAsReadContainer.appendChild(div);
  const countReadPost = parseInt(document.getElementById('count-read-post').innerText);
  document.getElementById('count-read-post').innerText = countReadPost + 1;
};
