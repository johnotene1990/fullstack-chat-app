import { config } from "dotenv";
import { connectDB } from "../db/db.js";
import User from "../models/user.model.js";


config();


const seedUsers = [
    // female users
    {
        email: "emma.thompsom@example.com",
        fullName: "Emma Thompson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg"
    },

     {
        email: "joy.peace@example.com",
        fullName: "Joy Peace",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
    },
     {
        email: "mars.kat@example.com",
        fullName: "Mars Kat",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/3.jpg"
    },
     {
        email: "cat.ene@example.com",
        fullName: "Cat Ene",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg"
    },
     {
        email: "dan,sophial@example.com",
        fullName: "Dan Sophial",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/5.jpg"
    },
     {
        email: "nas.gas@example.com",
        fullName: "Nas Gas",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/6.jpg"
    },
     {
        email: "sas.saa@example.com",
        fullName: "Sas Saa",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/7.jpg"
    },
     {
        email: "emma.tin@example.com",
        fullName: "Emma tin",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/8.jpg"
    },
     {
        email: "Fan.thom@example.com",
        fullName: "Fan Thom",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/9.jpg"
    },
     {
        email: "emma.jans@example.com",
        fullName: "Emma Jans",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/10.jpg"
    },
     {
        email: "lan.lan@example.com",
        fullName: "Lan Lan",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/11.jpg"
    },
     {
        email: "vanx.vanx@example.com",
        fullName: "Vanx Vanx",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/12.jpg"
    },
     {
        email: "emma.son@example.com",
        fullName: "Emma Son",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/13.jpg"
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database", error);
    }
};

// call the function
seedDatabase();