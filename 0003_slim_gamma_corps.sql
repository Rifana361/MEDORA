CREATE TABLE `support_tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`created` integer NOT NULL,
	`data` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `support_owner_idx` ON `support_tickets` (`owner`,`created`);--> statement-breakpoint
CREATE INDEX `support_created_idx` ON `support_tickets` (`created`);