import {sqliteTable,text,integer,index} from 'drizzle-orm/sqlite-core';
export const notebooks=sqliteTable('notebooks',{id:text('id').primaryKey(),owner:text('owner').notNull(),title:text('title').notNull(),created:integer('created').notNull(),updated:integer('updated').notNull(),data:text('data').notNull()},t=>[index('notebook_owner_idx').on(t.owner)]);
export const attempts=sqliteTable('attempts',{id:text('id').primaryKey(),owner:text('owner').notNull(),notebook:text('notebook').notNull(),created:integer('created').notNull(),deadline:integer('deadline').notNull(),data:text('data').notNull()},t=>[index('attempt_owner_idx').on(t.owner)]);
export const usage=sqliteTable('usage',{id:text('id').primaryKey(),owner:text('owner').notNull(),created:integer('created').notNull()},t=>[index('usage_owner_idx').on(t.owner,t.created)]);

export const guestSessions=sqliteTable('guest_sessions',{tokenHash:text('token_hash').primaryKey(),owner:text('owner').notNull(),created:integer('created').notNull(),expires:integer('expires').notNull()},t=>[index('guest_session_expiry_idx').on(t.expires)]);

export const revisionItems=sqliteTable('revision_items',{id:text('id').primaryKey(),owner:text('owner').notNull(),notebook:text('notebook').notNull(),created:integer('created').notNull(),due:integer('due').notNull(),data:text('data').notNull()},t=>[index('revision_owner_due_idx').on(t.owner,t.due),index('revision_notebook_idx').on(t.notebook)]);

export const supportTickets=sqliteTable('support_tickets',{id:text('id').primaryKey(),owner:text('owner').notNull(),created:integer('created').notNull(),data:text('data').notNull()},t=>[index('support_owner_idx').on(t.owner,t.created),index('support_created_idx').on(t.created)]);
