import { integer } from "drizzle-orm/gel-core";
import { pgTable, varchar, serial, timestamp,  boolean} from "drizzle-orm/pg-core";
import { time } from "node:console";
import { version } from "node:os";
import { title } from "node:process";



export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    password_hash: varchar("password_hash").notNull(),
    email: varchar("email").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    name: varchar("name", {length: 50}).notNull()
});

export const boards = pgTable("boards", {
    id: serial("id").primaryKey(),
    title: varchar("title", {length:50}).notNull(),
    ownerId: integer("owner_id").notNull().references(()=> users.id,{ onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const boardMembership = pgTable("board_memebership", {
    boardId: integer("board_id").notNull().references(()=> boards.id, {onDelete:"cascade"}),
    user_id: integer("user_id").notNull().references(() => users.id, {onDelete:"cascade"}),
    joined_at: timestamp("joined_at").notNull().defaultNow()
})

export const lists = pgTable("list", {
    id: serial("id").primaryKey(),
    board_id: integer("board_id").notNull().references(()=>boards.id, {onDelete:"cascade"}),
    title: varchar("title").notNull(),
    position: integer("position").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull()
})

export const cards = pgTable("cards", {
    id: serial("id").primaryKey(),
    listid: integer("list_id").notNull().references(() => lists.id,{onDelete:"cascade"}),
    title: varchar("title").notNull(),
    creator_id:integer("creator_id").notNull().references(() => users.id,{onDelete:"cascade"}),
    assignee_id:integer("assignee_id").references(() => users.id,{onDelete:"cascade"}),
    due_date:timestamp("due_date").defaultNow().notNull(),
    priority: varchar("priority").notNull(),
    position:integer("position").notNull(),
    version:integer("version").notNull().default(1),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull()
})

export const comments = pgTable("comments", {
    id: serial("id").primaryKey(),
    author_id: integer("author_id").notNull().references(() => users.id,{onDelete:"cascade"}),
    content: varchar("content").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull()
})




// src/db/schema.ts
// import { pgTable, serial, varchar, timestamp, boolean } from "drizzle-orm/pg-core";


// import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

// // 1. The Parent Table
// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100 }).notNull(),
// });

// // 2. The Child Table with Foreign Key
// export const posts = pgTable("posts", {
//   id: serial("id").primaryKey(),
//   title: varchar("title", { length: 256 }).notNull(),
  
//   // Highlighting the Foreign Key here:
//   authorId: integer("author_id")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }), 
// });

