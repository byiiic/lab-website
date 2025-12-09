const { createApp, ref, computed, onMounted, nextTick } = Vue;

// 定义一个复用的卡片组件，减少 HTML 代码量
const InfoCard = {
  props: ["item", "subtitle"],
  template: `
    <div 
        class="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition hover:scale-[1.02] flex flex-col break-words"
        @click="$emit('click')"
    >
        <div class="bg-gray-100 h-60 rounded-md mb-4 flex items-center justify-center overflow-hidden">
            <img 
                v-if="item.image" 
                :src="item.image" 
                :alt="item.title"
                class="w-full h-full object-cover"
            >
            <span v-else class="text-5xl">{{ item.icon }}</span>
        </div>
        <h3 class="text-xl font-semibold mb-2 break-words">{{ item.title }}</h3>
        <p v-if="subtitle" class="text-gray-400">{{ subtitle }}</p>
        <p class="text-gray-600 mt-auto break-words pt-4">Click to view details &gt;</p>
    </div>
    `,
};

createApp({
  components: {
    InfoCard, // 注册组件
  },
  setup() {
    const currentView = ref("home");
    const isMobileMenuOpen = ref(false);
    const videoRef = ref(null);
    const showPlayButton = ref(false);
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const isAboutHovered = ref(false);

    // 数据从全局变量 AppData 获取 (在 data.js 中定义)
    const dataParsed = window.AppData || {};

    // 2. 使用 || [] 做兜底
    // 如果 products 数据不存在，就给一个空数组，保证页面能渲染出框架，而不是白屏
    const products = ref(dataParsed.products || []);
    const tutorials = ref(dataParsed.tutorials || []);
    const members = ref(dataParsed.members || []);

    const showModal = ref(false);
    const modalImage = ref("");

    // 动画 Refs
    const headingRef = ref(null);
    const subheadingRef = ref(null);
    const homeVideoRef = ref(null);
    const resRef = ref(null);
    const newRef = ref(null);

    // 计算属性：当前选中的项目
    const currentDetail = computed(() => {
      if (currentView.value.startsWith("product-")) {
        const id = parseInt(currentView.value.split("-")[1]);
        return {
          type: "Research",
          data: products.value.find((p) => p.id === id),
        };
      }
      if (currentView.value.startsWith("tutorial-")) {
        const id = parseInt(currentView.value.split("-")[1]);
        return { type: "News", data: tutorials.value.find((p) => p.id === id) };
      }
      return null;
    });

    // 统一导航处理函数 (优化了 setTimeout)
    const handleNavigation = (viewName, selector) => {
      currentView.value = viewName;
      isMobileMenuOpen.value = false; // 自动关闭移动端菜单

      if (selector) {
        nextTick(() => {
          const el = document.querySelector(selector);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        });
      } else {
        // 如果没有 selector，说明是单纯的回到顶部
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const openModal = (imgUrl) => {
      if (!imgUrl) return;
      modalImage.value = imgUrl;
      showModal.value = true;
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      showModal.value = false;
      document.body.style.overflow = "";
    };

    const togglePlay = () => {
      if (!videoRef.value) return;
      videoRef.value.paused ? videoRef.value.play() : videoRef.value.pause();
    };

    const playVideo = () => {
      if (videoRef.value) {
        videoRef.value.play();
        showPlayButton.value = false;
      }
    };

    onMounted(() => {
      // Observer 逻辑保持不变，这部分写得很好
      const createObserver = (el, className) => {
        if (!el) return;
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(className);
              obs.unobserve(entry.target);
            }
          });
        });
        observer.observe(el);
      };

      createObserver(headingRef.value, "slide-up-fade-in");
      createObserver(subheadingRef.value, "slide-up-fade-in");
      createObserver(homeVideoRef.value, "slide-up-fade-in");
      createObserver(resRef.value, "slide-left-fade-in");
      createObserver(newRef.value, "slide-right-fade-in");

      if (isMobile) {
        showPlayButton.value = true;
      } else if (videoRef.value) {
        videoRef.value
          .play()
          .catch((err) => console.warn("Autoplay blocked", err));
      }
    });

    return {
      currentView,
      products,
      tutorials,
      members,
      currentDetail,
      handleNavigation,
      openModal,
      closeModal,
      showModal,
      modalImage,
      isMobileMenuOpen,
      isAboutHovered,
      videoRef,
      togglePlay,
      playVideo,
      showPlayButton,
      isMobile,
      headingRef,
      subheadingRef,
      homeVideoRef,
      resRef,
      newRef,
    };
  },
}).mount("#app");
