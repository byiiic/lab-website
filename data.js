// data.js
window.AppData = {
  products: [
    {
      id: 1,
      title: "iPA",
      icon: "📊",
      description:
        "An integrated toolkit for processing and analyzing cell images for correlative studies across modalities.",
      image: "img/ipa.jpg",
      ref: "https://github.com/lluoto/iPA",
    },
    {
      id: 2,
      title: "GraphMM",
      icon: "🤖",
      description:
        "Probabilistic metamodeling framework for multi-scale integration and inference.",
      image: "img/GraphMM-method.png",
      ref: "https://github.com/SunLab-SH/GraphMM",
    },
    {
      id: 3,
      title: "Discovering & Coupling Dynamical Systems",
      icon: "☁️",
      description:
        "Interactive 3D visualization of mesoscale models using Unity/WebGL engines.",
    },
  ],

  tutorials: [
    {
      id: 1,
      title: "Biological data compression",
      icon: "📊",
      description:
        "The 200GB of biological data(WFM, SIM, SXT, Cryo-ET) to be analyzed was compressed to 2GB with virtually no data loss.",
      image: "img/data-compression.png",
      isHorizontal: true,
    },
    {
      id: 2,
      title: "3D Packing with autoPACK",
      icon: "🤖",
      description:
        "Tutorial on how to model mitochondria and organelles using Blender + autoPACK.",
      time: "Updated: Mar 2025",
    },
    {
      id: 3,
      title: "Multi-scale Workshop",
      icon: "☁️",
      description:
        "Join our hands-on workshop on whole-cell simulation at NBCR Summer School.",
      time: "Upcoming: July 2025",
    },
  ],

  members: [
    {
      name: "XXX",
      role: "Principal Investigator",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      description: "Focuses on whole-cell modeling and computational biology.",
    },
    {
      name: "XXX",
      role: "PhD Candidate",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      description:
        "Working on graph-based algorithms for mesoscale structures.",
    },
    {
      name: "XXX",
      role: "Research Assistant",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      description: "Developer of the cellVIEW unity integration.",
    },
  ],
};
