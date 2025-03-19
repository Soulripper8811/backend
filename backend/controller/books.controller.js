import cloudinary from "../libs/cloudinary.js";
import prisma from "../libs/prisma.js";

export const createBook = async (req, res) => {
  const { name, author, description, image } = req.body;
  try {
    console.log(req.user);
    const role = req.user.role;
    if (!name || !author || !description || !image) {
      res.status(400).json({ message: "Please fill all the fields" });
    }
    if (role !== "admin") {
      res
        .status(401)
        .json({ message: "You are not authorized to create a book" });
    }
    let imageurl = null;
    if (image) {
      const uplaodedImage = await cloudinary.uploader.upload(image);
      imageurl = uplaodedImage.secure_url;
    }

    const newBook = await prisma.book.create({
      data: {
        name,
        author,
        description,
        image: imageurl,
        userId: req.user.id,
      },
    });

    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.error("Error in createBook", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json({ message: "Books found", books });
  } catch (error) {
    console.error("Error in getAllBooks", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSingleBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!book) {
      res.status(400).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book found", book });
  } catch (error) {
    console.error("Error in getSingleBook", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBook = async (req, res) => {
  const { bookId } = req.params;
  const { name, author, description, image } = req.body;
  try {
    if (!name || !author || !description || !image) {
      res.status(400).json({ message: "Please fill all the fields" });
    }
    let imageurl = null;
    if (image) {
      const uplaodedImage = await cloudinary.uploader.upload(image);
      imageurl = uplaodedImage.secure_url;
    }
    const book = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        name,
        author,
        description,
        image: imageurl,
      },
    });
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    console.error("Error in updateBook", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await prisma.book.delete({
      where: {
        id: bookId,
      },
    });
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully", book });
  } catch (error) {
    console.error("Error in deleteBook", error);
    res.status(500).json({ message: "Server error" });
  }
};
