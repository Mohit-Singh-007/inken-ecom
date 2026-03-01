import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

async function main() {
  console.log("Emptying database...");
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("Seeding categories...");
  const categoryData = [
    {
      name: "MEN",
      description: "Premium streetwear and essentials for men.",
      image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&q=80",
    },
    {
      name: "WOMEN",
      description: "High-performance fashion and silhouettes for women.",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    },
    {
      name: "ACCESSORIES",
      description: "The finishing touches for any fit.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    },
    {
      name: "DROPS",
      description: "Limited edition releases and collaboration pieces.",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80",
    },
  ];

  const categories = await Promise.all(
    categoryData.map((data) =>
      prisma.category.create({
        data: {
          ...data,
          slug: slugify(data.name),
        },
      })
    )
  );

  console.log("Seeding products...");
  
  // Helper for products
  const createProduct = async (data: any) => {
      const { name, ...rest } = data;
      return await prisma.product.create({
          data: {
              name,
              slug: slugify(name),
              ...rest,
              variants: {
                  create: [
                      { size: "S", stock: 10 },
                      { size: "M", stock: 15 },
                      { size: "L", stock: 12 },
                      { size: "XL", stock: 5 },
                  ]
              }
          }
      });
  };

  // Men's Products
  await createProduct({
    name: "OVERSIZED HEAVYWEIGHT TEE",
    description: "400GSM heavy cotton tee with a structural fit and drop shoulder aesthetic.",
    price: 1499,
    isFeatured: true,
    categoryId: categories[0].id,
    images: {
        create: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80", order: 0 }]
    }
  });

  await createProduct({
    name: "CARGO PARACHUTE PANTS",
    description: "Relaxed fit cargo pants with adjustable toggle hems and water-resistant finish.",
    price: 2999,
    categoryId: categories[0].id,
    images: {
        create: [{ url: "https://images.unsplash.com/photo-1517438476312-10d79c67750d?w=800&q=80", order: 0 }]
    }
  });

  // Women's Products
  await createProduct({
    name: "ESSENTIAL RIBBED TANK",
    description: "Form-fitting ribbed tank made from sustainable organic cotton.",
    price: 899,
    isFeatured: true,
    categoryId: categories[1].id,
    images: {
        create: [{ url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80", order: 0 }]
    }
  });

  await createProduct({
    name: "WIDE LEG TECH TROUSERS",
    description: "Sleek, high-waisted trousers with technical fabric and hidden zip pockets.",
    price: 3499,
    categoryId: categories[1].id,
    images: {
        create: [{ url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80", order: 0 }]
    }
  });

  // Accessories
  await createProduct({
    name: "TECHWEAR CROSSBODY BAG",
    description: "Modular sling bag with FIDLOCK buckles and waterproof zippers.",
    price: 1999,
    categoryId: categories[2].id,
    images: {
        create: [{ url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", order: 0 }]
    }
  });

  // Drops
  await createProduct({
    name: "DROP-01 LOGO HOODIE",
    description: "Limited edition logo hoodie from our debut street collection.",
    price: 4999,
    isFeatured: true,
    categoryId: categories[3].id,
    images: {
        create: [{ url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80", order: 0 }]
    }
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
