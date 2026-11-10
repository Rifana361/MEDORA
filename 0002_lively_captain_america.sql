CREATE TABLE `revision_items` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`notebook` text NOT NULL,
	`created` integer NOT NULL,
	`due` integer NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `revision_owner_due_idx` ON `revision_items` (`owner`,`due`);--> statement-breakpoint
CREATE INDEX `revision_notebook_idx` ON `revision_items` (`notebook`);