const { createApp, ref, computed, onMounted, nextTick } = Vue;

createApp({
    setup() {
    const currentView = ref('home');
    const isMobileMenuOpen = ref(false);
    const videoRef = ref(null);
    const showPlayButton = ref(false);
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    
    console.log("isMobile:", isMobile);

        
    // Refs for intersection observer
    const headingRef = ref(null);
    const subheadingRef = ref(null);
    const homeVideoRef = ref(null);
    const resRef = ref(null);
    const newRef = ref(null);

    onMounted(() => {
        const createObserver = (el, className) => {
            const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                entry.target.classList.add(className);
                observer.unobserve(entry.target);
                }
            });
            });

            if (el) observer.observe(el);
        };

        createObserver(headingRef.value, 'slide-up-fade-in');
        createObserver(subheadingRef.value, 'slide-up-fade-in');
        createObserver(homeVideoRef.value, 'slide-up-fade-in');
        createObserver(resRef.value, 'slide-left-fade-in');
        createObserver(newRef.value, 'slide-right-fade-in');

        if (isMobile) {
            showPlayButton.value = true;
        } else if (videoRef.value) {
            videoRef.value.play().catch(err => {
            console.warn('PC autoplay blocked:', err);
            });
        }
    });
        
    const playVideo = () => {
      const video = videoRef.value;
      if (video && video.paused) {
        video.play();
        showPlayButton.value = false; // hide play button after playing
      }
    };

    const togglePlay = () => {
    if (!videoRef.value) return;
    if (videoRef.value.paused) {
        videoRef.value.play();
    } else {
        videoRef.value.pause();
    }
    };
    
    // Features data
    const products = ref([
        {
        id: 1,
        title: "autoPACK",
        icon: "📊",
        description: "Packing of complex spatial models (proteins, vesicles) into cellular geometry with no overlaps.",
        },
        {
        id: 2,
        title: "GraphMM",
        icon: "🤖",
        description: "Probabilistic metamodeling framework for multi-scale integration and inference.",
        image: "img/GraphMM-method.png",
        ref:"https://github.com/SunLab-SH/GraphMM"
        },
        {
        id: 3,
        title: "cellVIEW",
        icon: "☁️",
        description: "Interactive 3D visualization of mesoscale models using Unity/WebGL engines.",
        }
    ]);

    const showModal = ref(false);
    const modalImage = ref('');

    // calculate current product
    const currentProduct = computed(() => {
        if (!currentView.value.startsWith('product-')) return null;
        const productId = parseInt(currentView.value.split('-')[1]);
        return products.value.find(p => p.id === productId);
    });

    // tutorials data
    const tutorials = ref([
        {
        id: 1,
        title: "tutorial Paper on β-cell Modeling",
        icon: "📊",
        description: "GraphMM reveals how Ca²⁺ channel variations impact Type 2 diabetes onset.",
        time: "Published: May 2025"
        },
        {
        id: 2,
        title: "3D Packing with autoPACK",
        icon: "🤖",
        description: "Tutorial on how to model mitochondria and organelles using Blender + autoPACK.",
        time: "Updated: Mar 2025"
        },
        {
        id: 3,
        title: "Multi-scale Workshop",
        icon: "☁️",
        description: "Join our hands-on workshop on whole-cell simulation at NBCR Summer School.",
        time: "Upcoming: July 2025"
        }
    ]);

    // tutorial
    const currentTutorial = computed(() => {
        if (!currentView.value.startsWith('tutorial-')) return null;
        const tutorialId = parseInt(currentView.value.split('-')[1]);
        return tutorials.value.find(p => p.id === tutorialId);
    });

    // scroll to section
    const scrollTo = (selector) => {
        console.log("scroll!")

        setTimeout(() => {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
        };
        
    // jump to section without scrolling
    const jumpTo = (selector) => {
        console.log("jump!")
            
        nextTick(() => {
            const el = document.querySelector(selector);
            if (el) {
            el.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
        });
    };


    const openModal = (imgUrl) => {
    if (!imgUrl) return; 
    console.log('openModal called with:', imgUrl); 
    modalImage.value = imgUrl;
    showModal.value = true;
    document.body.style.overflow = 'hidden'; // avoid background scroll
    };

    const closeModal = () => {
    showModal.value = false;
    document.body.style.overflow = '';
    };

    return { 
        currentView, 
        products, 
        tutorials,
        currentProduct,
        currentTutorial,
        scrollTo,
        jumpTo,
        openModal,
        closeModal,
        showModal,
        modalImage,
        isMobileMenuOpen,
        videoRef,
        togglePlay,
        headingRef,
        subheadingRef,
        homeVideoRef,
        resRef,
        newRef,
        playVideo,
        showPlayButton,
        isMobile
    };
}
}).mount('#app');
