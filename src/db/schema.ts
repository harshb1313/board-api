import { pgTable, varchar, serial, timestamp,  boolean, integer, primaryKey} from "drizzle-orm/pg-core";
import { table } from "node:console";




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
}, 
(table) => [primaryKey({columns:[table.boardId, table.user_id]})]

)

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
    description: varchar("description"),
    creator_id:integer("creator_id").notNull().references(() => users.id,{onDelete:"cascade"}),
    assignee_id:integer("assignee_id").references(() => users.id,{onDelete:"cascade"}),
    due_date:timestamp("due_date"),
    priority: varchar("priority").notNull(),
    position:integer("position").notNull(),
    version:integer("version").notNull().default(1),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull()
})

export const comments = pgTable("comments", {
    id: serial("id").primaryKey(),
    author_id: integer("author_id").notNull().references(() => users.id,{onDelete:"cascade"}),
    cardId: integer("card_id").notNull().references(() => cards.id, {onDelete:"cascade"}),
    content: varchar("content").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull()
})






//COMPOSITE KEY SYNTAX:
//   (table) => [
//     primaryKey({ columns: [table.studentId, table.bookId] })
//   ]
// );