const { createApp, ref, computed, onMounted, nextTick } = Vue;

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
    InfoCard,
  },
  setup() {
    const currentView = ref("home");
    const isMobileMenuOpen = ref(false);
    const videoRef = ref(null);
    const showPlayButton = ref(false);
    const isAboutHovered = ref(false);

    const checkMobile = () => {
      const isUserAgentMobile = /Mobi|Android|iPhone|iPad/i.test(
        navigator.userAgent
      );
      const isPortraitRatio = window.innerWidth / window.innerHeight < 5 / 4;
      return isUserAgentMobile || isPortraitRatio;
    };
    window.addEventListener("resize", () => {
      isMobile.value = checkMobile();
    });
    const isMobile = ref(checkMobile());

    const dataParsed = window.AppData || {};
    const products = ref(dataParsed.products || []);
    const tutorials = ref(dataParsed.tutorials || []);
    const members = ref(dataParsed.members || []);

    const showModal = ref(false);
    const modalImage = ref("");

    const headingRef = ref(null);
    const subheadingRef = ref(null);
    const homeVideoRef = ref(null);
    const resRef = ref(null);
    const newRef = ref(null);

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

    const handleNavigation = (viewName, selector) => {
      currentView.value = viewName;
      isMobileMenuOpen.value = false;

      if (selector) {
        nextTick(() => {
          const el = document.querySelector(selector);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
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
