import post1 from "./Blog/blog-post.1.md";
import post2 from "./Blog/blog-post.1.md";
import post3 from "./Blog/blog-post.1.md";

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content."
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content."
  }
];

const posts = [post1, post2, post3];

const social = [
  {
    Facebook: {
      link: "https://www.facebook.com/terralumx/"
    },
    Instagram: {
      link: "https://www.instagram.com/terralumx/"
    }
  }
];

const productSteps = [
  {
    label: "Planta",
    imgPath:
      "https://images.unsplash.com/photo-1513358130276-442a18340285?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
  },
  {
    label: "Planta",
    imgPath:
      "https://images.unsplash.com/photo-1521797482182-c08bba8c6b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
  },
  {
    label: "Planta",
    imgPath:
      "https://images.unsplash.com/photo-1531339154016-8b09f0c5a351?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
  }
];

const productCatalog = [
  {
    id: 1,
    name: "Planta 1",
    precio: 200,
    fotos: productSteps,
    thumb:
      "https://images.unsplash.com/photo-1513664831196-c7f22ba6e25f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    description: "Planta 1"
  },
  {
    id: 2,
    name: "Planta 2",
    precio: 200,
    fotos: productSteps,
    thumb:
      "https://images.unsplash.com/photo-1513664657915-00012fd1e1d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    description: "Planta 2"
  },
  {
    id: 3,
    name: "Planta 3",
    precio: 200,
    fotos: productSteps,
    thumb:
      "https://images.unsplash.com/photo-1531668897726-0338038642f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    description: "Planta 3"
  },
  {
    id: 4,
    name: "Planta 4",
    precio: 200,
    fotos: productSteps,
    thumb:
      "https://images.unsplash.com/photo-1513664831196-c7f22ba6e25f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    description: "Planta 1"
  },
  {
    id: 5,
    name: "Planta 5",
    precio: 200,
    fotos: productSteps,
    thumb:
      "https://images.unsplash.com/photo-1513664657915-00012fd1e1d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    description: "Planta 2"
  },
  {
    id: 6,
    name: "Planta 6",
    precio: 200,
    fotos: productSteps,
    thumb:
      "https://images.unsplash.com/photo-1531668897726-0338038642f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    description: "Planta 3"
  }
];

export { featuredPosts, posts, social, productCatalog };
