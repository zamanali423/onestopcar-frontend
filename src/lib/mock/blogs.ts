// src/lib/mock/blogs.ts
import { simulateDelay, createApiResponse, type ApiResponse } from "./api";

export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "editor" | "author";
  bio?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: BlogAuthor;
  categories: BlogCategory[];
  tags: BlogTag[];
  status: "published" | "draft" | "archived" | "scheduled";
  views: number;
  likes: number;
  comments: number;
  featuredImage: string;
  images: string[];
  publishedAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  readingTime?: number;
  isFeatured: boolean;
}

// Blog Authors
export const blogAuthors: BlogAuthor[] = [
  {
    id: "author-1",
    name: "Admin",
    email: "admin@onestopcar.com",
    role: "admin",
    bio: "Automotive enthusiast with 10+ years of experience in the car accessories industry.",
  },
  {
    id: "author-2",
    name: "Tech Team",
    email: "tech@onestopcar.com",
    role: "editor",
    bio: "Technical experts specializing in automotive electronics and LED upgrades.",
  },
  {
    id: "author-3",
    name: "Sarah Khan",
    email: "sarah@onestopcar.com",
    role: "author",
    bio: "Car detailing specialist with a passion for paint protection and ceramic coating.",
  },
  {
    id: "author-4",
    name: "Ahmed Raza",
    email: "ahmed@onestopcar.com",
    role: "author",
    bio: "Performance tuning expert and automotive journalist.",
  },
];

// Blog Categories
export const blogCategories: BlogCategory[] = [
  {
    id: "cat-1",
    name: "Guides",
    slug: "guides",
    description: "Step-by-step guides and tutorials",
  },
  {
    id: "cat-2",
    name: "News",
    slug: "news",
    description: "Latest news and updates",
  },
  {
    id: "cat-3",
    name: "Reviews",
    slug: "reviews",
    description: "Product reviews and comparisons",
  },
  {
    id: "cat-4",
    name: "DIY Tips",
    slug: "diy-tips",
    description: "Do-it-yourself tips and tricks",
  },
  {
    id: "cat-5",
    name: "Car Care",
    slug: "car-care",
    description: "Car maintenance and care tips",
  },
  {
    id: "cat-6",
    name: "Industry Insights",
    slug: "industry-insights",
    description: "Automotive industry insights and trends",
  },
];

// Blog Tags
export const blogTags: BlogTag[] = [
  { id: "tag-1", name: "LED Lighting", slug: "led-lighting" },
  { id: "tag-2", name: "Engine", slug: "engine" },
  { id: "tag-3", name: "Brakes", slug: "brakes" },
  { id: "tag-4", name: "Performance", slug: "performance" },
  { id: "tag-5", name: "Detailing", slug: "detailing" },
  { id: "tag-6", name: "PPF", slug: "ppf" },
  { id: "tag-7", name: "Ceramic Coating", slug: "ceramic-coating" },
  { id: "tag-8", name: "Suspension", slug: "suspension" },
  { id: "tag-9", name: "Interior", slug: "interior" },
  { id: "tag-10", name: "Exterior", slug: "exterior" },
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 5 LED Lighting Upgrades for Your Vehicle",
    slug: "top-5-led-lighting-upgrades",
    excerpt:
      "Upgrade your vehicle's lighting with these top 5 LED solutions for better visibility and style.",
    content: `
      <h2>Introduction</h2>
      <p>LED lighting has revolutionized the automotive industry. From better visibility to enhanced style, LED upgrades offer numerous benefits. In this guide, we'll explore the top 5 LED lighting upgrades for your vehicle.</p>
      
      <h2>1. LED Headlight Conversion Kit</h2>
      <p>Upgrade your dim halogen headlights with bright, energy-efficient LED bulbs. Enjoy better visibility and a modern look.</p>
      
      <h2>2. LED Fog Lights</h2>
      <p>Improve visibility in adverse weather conditions with powerful LED fog lights that cut through fog and rain.</p>
      
      <h2>3. LED Interior Lights</h2>
      <p>Transform your car's interior with ambient LED lighting. Available in multiple colors to match your style.</p>
      
      <h2>4. LED Tail Lights</h2>
      <p>Enhance safety and style with bright LED tail lights that ensure you're seen on the road.</p>
      
      <h2>5. LED DRLs</h2>
      <p>Add daytime running lights for improved visibility and a premium look.</p>
      
      <h2>Conclusion</h2>
      <p>Upgrading to LED lighting is one of the best modifications you can make to your vehicle. It improves safety, enhances style, and increases the value of your car.</p>
    `,
    author: blogAuthors[0],
    categories: [blogCategories[0], blogCategories[2]],
    tags: [blogTags[0], blogTags[3]],
    status: "published",
    views: 1240,
    likes: 89,
    comments: 24,
    featuredImage:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=400&fit=crop",
    ],
    publishedAt: "2024-01-10T10:00:00Z",
    scheduledAt: null,
    createdAt: "2024-01-08T09:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
    metaTitle: "Top 5 LED Lighting Upgrades for Your Vehicle | OneStopCar",
    metaDescription:
      "Discover the best LED lighting upgrades for your vehicle including headlights, fog lights, interior lights, tail lights, and DRLs.",
    keywords: [
      "LED lighting",
      "car upgrades",
      "LED headlights",
      "automotive lighting",
    ],
    readingTime: 5,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Complete Guide to Engine Block Assembly",
    slug: "complete-guide-engine-block-assembly",
    excerpt:
      "Learn everything you need to know about engine block assembly, from preparation to final installation.",
    content: `
      <h2>Introduction</h2>
      <p>Engine block assembly is a complex but rewarding process. This comprehensive guide will walk you through every step of the process.</p>
      
      <h2>Preparation</h2>
      <p>Before starting, ensure you have all the necessary tools and components. Clean the engine block thoroughly and inspect for any damage.</p>
      
      <h2>Installation Steps</h2>
      <ol>
        <li>Install the crankshaft</li>
        <li>Install the pistons and connecting rods</li>
        <li>Install the cylinder head</li>
        <li>Install the timing chain</li>
        <li>Install the oil pan and accessories</li>
      </ol>
      
      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li>Not cleaning components properly</li>
        <li>Incorrect torque specifications</li>
        <li>Missing gaskets and seals</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>With proper preparation and attention to detail, engine block assembly can be a successful DIY project.</p>
    `,
    author: blogAuthors[1],
    categories: [blogCategories[0], blogCategories[5]],
    tags: [blogTags[1], blogTags[3]],
    status: "published",
    views: 856,
    likes: 56,
    comments: 12,
    featuredImage:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&h=400&fit=crop",
    ],
    publishedAt: "2024-01-08T10:00:00Z",
    scheduledAt: null,
    createdAt: "2024-01-05T09:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z",
    metaTitle: "Complete Guide to Engine Block Assembly | OneStopCar",
    metaDescription:
      "Step-by-step guide to engine block assembly including preparation, installation, and common mistakes to avoid.",
    keywords: [
      "engine assembly",
      "engine block",
      "DIY engine",
      "automotive guide",
    ],
    readingTime: 8,
    isFeatured: false,
  },
  {
    id: "3",
    title: "Choosing the Right Brake Pads for Performance",
    slug: "choosing-right-brake-pads-performance",
    excerpt:
      "Find out how to select the perfect brake pads for your driving style and vehicle needs.",
    content: `
      <h2>Introduction</h2>
      <p>Brake pads are one of the most important safety components of your vehicle. Choosing the right brake pads can significantly impact your driving experience.</p>
      
      <h2>Types of Brake Pads</h2>
      <ul>
        <li><strong>Ceramic:</strong> Quiet, low dust, excellent for daily driving</li>
        <li><strong>Semi-metallic:</strong> Great stopping power, suitable for performance driving</li>
        <li><strong>Organic:</strong> Affordable, good for light-duty vehicles</li>
      </ul>
      
      <h2>Factors to Consider</h2>
      <ul>
        <li>Driving style</li>
        <li>Vehicle type</li>
        <li>Climate conditions</li>
        <li>Budget</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Choose brake pads that match your driving needs and budget for optimal performance and safety.</p>
    `,
    author: blogAuthors[0],
    categories: [blogCategories[2], blogCategories[0]],
    tags: [blogTags[2], blogTags[3]],
    status: "draft",
    views: 0,
    likes: 0,
    comments: 0,
    featuredImage:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=400&fit=crop",
    ],
    publishedAt: null,
    scheduledAt: null,
    createdAt: "2024-01-12T09:00:00Z",
    updatedAt: "2024-01-12T09:00:00Z",
    metaTitle: "Choosing the Right Brake Pads for Performance | OneStopCar",
    metaDescription:
      "Learn how to choose the perfect brake pads for your driving style and vehicle needs.",
    keywords: [
      "brake pads",
      "performance brakes",
      "ceramic brakes",
      "semi-metallic brakes",
    ],
    readingTime: 4,
    isFeatured: false,
  },
  {
    id: "4",
    title: "PPF vs Ceramic Coating: Which is Right for You?",
    slug: "ppf-vs-ceramic-coating",
    excerpt:
      "Compare paint protection film (PPF) and ceramic coating to decide which is best for your vehicle.",
    content: `
      <h2>Introduction</h2>
      <p>Protecting your car's paint is essential for maintaining its value and appearance. Two popular options are PPF and ceramic coating.</p>
      
      <h2>What is PPF?</h2>
      <p>Paint Protection Film is a clear, durable film applied to the exterior of your vehicle. It provides excellent protection against rock chips, scratches, and UV damage.</p>
      
      <h2>What is Ceramic Coating?</h2>
      <p>Ceramic coating is a liquid polymer that bonds with your car's paint, creating a hydrophobic layer that repels water, dirt, and contaminants.</p>
      
      <h2>Comparison</h2>
      <table>
        <tr>
          <th>Feature</th>
          <th>PPF</th>
          <th>Ceramic Coating</th>
        </tr>
        <tr>
          <td>Protection</td>
          <td>Physical (rock chips, scratches)</td>
          <td>Chemical (UV, water spots)</td>
        </tr>
        <tr>
          <td>Durability</td>
          <td>5-10 years</td>
          <td>2-5 years</td>
        </tr>
        <tr>
          <td>Cost</td>
          <td>Higher</td>
          <td>Lower</td>
        </tr>
      </table>
      
      <h2>Conclusion</h2>
      <p>Choose PPF for maximum physical protection or ceramic coating for hydrophobic properties. Many car owners opt for both.</p>
    `,
    author: blogAuthors[2],
    categories: [blogCategories[3], blogCategories[4]],
    tags: [blogTags[5], blogTags[6]],
    status: "published",
    views: 2340,
    likes: 178,
    comments: 45,
    featuredImage:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=400&fit=crop",
    ],
    publishedAt: "2024-01-15T10:00:00Z",
    scheduledAt: null,
    createdAt: "2024-01-12T09:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    metaTitle: "PPF vs Ceramic Coating: Which is Right for You? | OneStopCar",
    metaDescription:
      "Compare paint protection film and ceramic coating to decide which is best for your vehicle.",
    keywords: ["PPF", "ceramic coating", "paint protection", "car detailing"],
    readingTime: 6,
    isFeatured: true,
  },
  {
    id: "5",
    title: "How to Apply Ceramic Coating at Home",
    slug: "how-to-apply-ceramic-coating-at-home",
    excerpt:
      "A step-by-step guide to applying ceramic coating on your car at home. Save money while protecting your car's paint.",
    content: `
      <h2>Introduction</h2>
      <p>Ceramic coating is a great way to protect your car's paint, but professional application can be expensive. With the right tools and preparation, you can apply ceramic coating at home.</p>
      
      <h2>What You'll Need</h2>
      <ul>
        <li>Ceramic coating kit</li>
        <li>Microfiber towels</li>
        <li>Paint prep spray</li>
        <li>Clay bar</li>
        <li>UV light (optional)</li>
      </ul>
      
      <h2>Step-by-Step Guide</h2>
      <ol>
        <li>Wash and dry your car thoroughly</li>
        <li>Clay bar the entire car</li>
        <li>Apply paint prep spray</li>
        <li>Apply ceramic coating in sections</li>
        <li>Buff and level the coating</li>
        <li>Wait for the cure time</li>
      </ol>
      
      <h2>Tips for Success</h2>
      <ul>
        <li>Work in a cool, shaded area</li>
        <li>Use UV light to check coverage</li>
        <li>Don't rush the process</li>
      </ul>
    `,
    author: blogAuthors[2],
    categories: [blogCategories[3], blogCategories[4]],
    tags: [blogTags[6], blogTags[4]],
    status: "published",
    views: 1870,
    likes: 92,
    comments: 28,
    featuredImage:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&h=400&fit=crop",
    ],
    publishedAt: "2024-01-18T10:00:00Z",
    scheduledAt: null,
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
    metaTitle: "How to Apply Ceramic Coating at Home | OneStopCar",
    metaDescription:
      "Step-by-step guide to applying ceramic coating on your car at home. Save money and protect your car's paint.",
    keywords: [
      "ceramic coating",
      "DIY coating",
      "car detailing",
      "paint protection",
    ],
    readingTime: 7,
    isFeatured: false,
  },
  {
    id: "6",
    title: "Suspension Upgrades for Better Handling",
    slug: "suspension-upgrades-better-handling",
    excerpt:
      "Learn about the best suspension upgrades for improved handling and ride comfort.",
    content: `
      <h2>Introduction</h2>
      <p>Upgrading your vehicle's suspension can dramatically improve handling, ride comfort, and overall driving experience. Here's what you need to know.</p>
      
      <h2>Types of Suspension Upgrades</h2>
      <ul>
        <li><strong>Coilovers:</strong> Adjustable ride height and damping</li>
        <li><strong>Lowering Springs:</strong> Reduce ride height for improved handling</li>
        <li><strong>Performance Shocks:</strong> Better damping for improved control</li>
        <li><strong>Strut Bars:</strong> Improve chassis rigidity</li>
      </ul>
      
      <h2>Benefits</h2>
      <ul>
        <li>Improved cornering ability</li>
        <li>Better steering response</li>
        <li>Reduced body roll</li>
        <li>Enhanced driving confidence</li>
      </ul>
      
      <h2>Choosing the Right Setup</h2>
      <p>Consider your driving style and intended use. Track days require a different setup than daily driving.</p>
    `,
    author: blogAuthors[3],
    categories: [blogCategories[0], blogCategories[5]],
    tags: [blogTags[7], blogTags[3]],
    status: "scheduled",
    views: 0,
    likes: 0,
    comments: 0,
    featuredImage:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&h=400&fit=crop",
    ],
    publishedAt: null,
    scheduledAt: "2024-01-25T10:00:00Z",
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-01-20T09:00:00Z",
    metaTitle: "Suspension Upgrades for Better Handling | OneStopCar",
    metaDescription:
      "Discover the best suspension upgrades for improved handling and ride comfort.",
    keywords: [
      "suspension",
      "coilovers",
      "lowering springs",
      "performance shocks",
      "handling",
    ],
    readingTime: 5,
    isFeatured: false,
  },
];

// Mock API Functions
export const getBlogPosts = async (): Promise<ApiResponse<BlogPost[]>> => {
  await simulateDelay(500);
  return createApiResponse(mockBlogPosts);
};

export const getBlogPostById = async (
  id: string,
): Promise<ApiResponse<BlogPost | null>> => {
  await simulateDelay(300);
  const post = mockBlogPosts.find((p) => p.id === id);
  return createApiResponse(post || null);
};

export const getBlogPostBySlug = async (
  slug: string,
): Promise<ApiResponse<BlogPost | null>> => {
  await simulateDelay(300);
  const post = mockBlogPosts.find((p) => p.slug === slug);
  return createApiResponse(post || null);
};

export const getBlogPostsByCategory = async (
  categoryId: string,
): Promise<ApiResponse<BlogPost[]>> => {
  await simulateDelay(400);
  const posts = mockBlogPosts.filter((p) =>
    p.categories.some((c) => c.id === categoryId),
  );
  return createApiResponse(posts);
};

export const getBlogPostsByTag = async (
  tagId: string,
): Promise<ApiResponse<BlogPost[]>> => {
  await simulateDelay(400);
  const posts = mockBlogPosts.filter((p) => p.tags.some((t) => t.id === tagId));
  return createApiResponse(posts);
};

export const getPublishedBlogPosts = async (): Promise<
  ApiResponse<BlogPost[]>
> => {
  await simulateDelay(400);
  const posts = mockBlogPosts.filter((p) => p.status === "published");
  return createApiResponse(posts);
};

export const getFeaturedBlogPosts = async (): Promise<
  ApiResponse<BlogPost[]>
> => {
  await simulateDelay(300);
  const posts = mockBlogPosts.filter(
    (p) => p.isFeatured && p.status === "published",
  );
  return createApiResponse(posts);
};

export const searchBlogPosts = async (
  query: string,
): Promise<ApiResponse<BlogPost[]>> => {
  await simulateDelay(500);
  const results = mockBlogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      p.content.toLowerCase().includes(query.toLowerCase()) ||
      p.author.name.toLowerCase().includes(query.toLowerCase()),
  );
  return createApiResponse(results);
};

export const getBlogStats = async () => {
  await simulateDelay(300);
  const published = mockBlogPosts.filter((p) => p.status === "published");
  const drafts = mockBlogPosts.filter((p) => p.status === "draft");
  const scheduled = mockBlogPosts.filter((p) => p.status === "scheduled");
  const totalViews = mockBlogPosts.reduce((sum, p) => sum + p.views, 0);
  const totalComments = mockBlogPosts.reduce((sum, p) => sum + p.comments, 0);

  return createApiResponse({
    totalPosts: mockBlogPosts.length,
    published: published.length,
    drafts: drafts.length,
    scheduled: scheduled.length,
    totalViews,
    totalComments,
  });
};
