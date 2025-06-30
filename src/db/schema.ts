
import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password').notNull(),
    phone: varchar('phone', { length: 10 }).notNull(),
    address1: varchar('address1', { length: 255 }).notNull(),
    address2: varchar('address2', { length: 255 }),
    city: varchar('city', { length: 255 }).notNull(),
    state: varchar('state', { length: 2 }).notNull(),
    zip: varchar('zip', { length: 10 }).notNull(),
    notes: varchar('notes', { length: 255 }),
    country: varchar('country', { length: 255 }).notNull(),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
})
export const refreshTokens = pgTable('refresh_tokens', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id),
    token: varchar('token', { length: 255 }).unique().notNull(),
    revoked: boolean('revoked').default(false),
    expiresAt: timestamp('expires_at'),
    createdAt: timestamp('created_at').defaultNow(),
});
export const tickets = pgTable('tickets', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    completed: boolean('completed').notNull().default(false),
    tech: varchar('tech').notNull().default('unassigned'),
    status: varchar('status', { length: 255 }).notNull().default('open'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
});

//định nghĩa user sẽ có nhiều ticket
export const userRelations = relations(users, ({ many }) => ({
    tickets: many(tickets),
}));

//định nghĩa ticket sẽ có một user
export const ticketRelations = relations(tickets, ({ one }) => ({
    user: one(users, {
        fields: [tickets.userId],
        references: [users.id],
    }),
}));

//định nghĩa user sẽ có nhiều refresh token
export const userTokenRelations = relations(users, ({ many }) => ({
    refreshTokens: many(refreshTokens),
}))
//định nghĩa refresh token sẽ có một user
export const refreshTokenRelations = relations(refreshTokens, ({ one }) => ({
    user: one(users, {
        fields: [refreshTokens.userId],
        references: [users.id]
    })
}))