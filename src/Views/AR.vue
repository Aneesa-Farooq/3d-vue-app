<template>
  <div id="iframeContainer"></div>
  <!-- <iframe id="iframe_id" class="h-[calc(100vh-68px-3rem)] w-full" src="http://localhost:5174?data=123" title="3D viewer"></iframe> -->
</template>

<script>
export default {
  name: "AR",
  data() {
    return {
      url: "",
    };
  },
  mounted() {
    const canvasOnDom = document.querySelectorAll(".canvas");
    if (canvasOnDom.length > 1) {
      canvasOnDom[0].remove();
      console.log("hello");
    }

    this.url = localStorage.getItem("finalUrl");
    console.log("url in arviewer", this.url);
    const encodedPart = "%2F";
    const placeholder = "PLACEHOLDER";
    this.url = this.url.replace(encodedPart, placeholder);
    let message = encodeURIComponent(this.url);
    console.log(message);
    const iframe = document.createElement("iframe");
    iframe.src = `http://localhost:8080/?data=${message}`;
    iframe.classList.add("h-[calc(100vh-68px-3rem)]", "w-full");
    document.querySelector("#iframeContainer").appendChild(iframe);
  },
};
</script>
