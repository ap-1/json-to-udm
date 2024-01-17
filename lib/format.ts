import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// https://cloud.google.com/chronicle/docs/reference/important-udm-fields
// https://cloud.google.com/chronicle/docs/reference/udm-field-list

const format = z.object({
	entity: z
		.object({
			asset: z
				.object({
					asset_id: z.string().describe("The asset ID."),
					category: z
						.string()
						.describe(
							'The category of the asset (e.g. "End User Asset", "Workstation", "Server").'
						),
					first_discover_time: z
						.string()
						.describe(
							"Time the asset was first discovered (by asset management/discoverability software)."
						),
					first_seen_time: z
						.string()
						.describe(
							"The first observed time for an asset. The value is calculated on the basis of the first time the identifier was observed."
						),
					hostname: z
						.string()
						.describe("Asset hostname or domain name field."),
					ip: z
						.string()
						.array()
						.describe(
							"A list of IP addresses associated with an asset."
						),
					last_boot_time: z
						.string()
						.describe("Time the asset was last boot started."),
					last_discover_time: z
						.string()
						.describe(
							"Time the asset was last discovered (by asset management/discoverability software)."
						),
					location: z.string().describe("Location of the asset."),
					mac: z
						.string()
						.array()
						.describe(
							"List of MAC addresses associated with an asset."
						),
					nat_ip: z
						.string()
						.array()
						.describe(
							"List of NAT IP addresses associated with an asset."
						),
					network_domain: z
						.string()
						.describe(
							'The network domain of the asset (e.g. "corp.acme.com")'
						),
					product_object_id: z
						.string()
						.describe(
							"A vendor-specific identifier to uniquely identify the entity (a GUID or similar)."
						),
					system_last_update_time: z
						.string()
						.describe(
							"Time the asset system or OS was last updated. For all other operations that are not system updates (such as resizing a VM), use Attribute.last_update_time."
						),
					vulnerabilities: z
						.string()
						.array()
						.describe("Vulnerabilities discovered on asset."),
				})
				.describe(
					"Information about a compute asset such as a workstation, laptop, phone, virtual desktop, or VM."
				),
			group: z
				.object({
					email_addresses: z
						.string()
						.array()
						.describe("Email addresses of the group."),
					group_display_name: z
						.string()
						.describe('Group display name. e.g. "Finance".'),
					product_object_id: z
						.string()
						.describe(
							"Product globally unique user object identifier, such as an LDAP Object Identifier."
						),
					windows_sid: z
						.string()
						.describe("Microsoft Windows SID of the group."),
				})
				.describe(" Information about an organizational group."),
		})
		.describe(
			"An Entity provides additional context about an item in a UDM event."
		),
	metadata: z
		.object({
			collected_timestamp: z
				.string()
				.describe(
					"GMT timestamp when the entity information was collected by the vendor's local collection infrastructure."
				),
			creation_timestamp: z
				.string()
				.describe(
					"GMT timestamp when the entity described by the product_entity_id was created on the system where data was collected."
				),
			description: z
				.string()
				.describe("Human-readable description of the entity."),
			feed: z
				.string()
				.describe("Vendor feed name for a threat indicator feed."),
			interval: z
				.string()
				.describe(
					"Valid existence time range for the version of the entity represented by this entity data."
				),
			product_entity_id: z
				.string()
				.describe(
					"A vendor-specific identifier that uniquely identifies the entity (e.g. a GUID, LDAP, OID, or similar)."
				),
			product_name: z
				.string()
				.describe("Product name that produced the entity information."),
			product_version: z
				.string()
				.describe(
					"Version of the product that produced the entity information."
				),
			vendor_name: z
				.string()
				.describe(
					"Vendor name of the product that produced the entity information."
				),
		})
		.describe(
			"Information about the Entity and the product where the entity was created."
		),
});

export const schema = zodToJsonSchema(format);
