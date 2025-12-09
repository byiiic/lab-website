// data.js
const AppData = {
  products: [
    {
      id: 1,
      title: "autoPACK",
      icon: "📊",
      description:
        "Packing of complex spatial models (proteins, vesicles) into cellular geometry with no overlaps.",
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
      title: "cellVIEW",
      icon: "☁️",
      description:
        "Interactive 3D visualization of mesoscale models using Unity/WebGL engines.",
    },
  ],

  tutorials: [
    {
      id: 1,
      title: "tutorial Paper on β-cell Modeling",
      icon: "📊",
      description:
        "GraphMM reveals how Ca²⁺ channel variations impact Type 2 diabetes onset.",
      time: "Published: May 2025",
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
