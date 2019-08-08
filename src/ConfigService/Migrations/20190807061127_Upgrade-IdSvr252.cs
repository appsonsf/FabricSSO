using Microsoft.EntityFrameworkCore.Migrations;

namespace ConfigService.Migrations
{
    public partial class UpgradeIdSvr252 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PersistedGrants_SubjectId_ClientId_Type",
                table: "PersistedGrants");

            migrationBuilder.CreateIndex(
                name: "IX_PersistedGrants_SubjectId_ClientId_Type_Expiration",
                table: "PersistedGrants",
                columns: new[] { "SubjectId", "ClientId", "Type", "Expiration" });

            migrationBuilder.CreateIndex(
                name: "IX_DeviceCodes_Expiration",
                table: "DeviceCodes",
                column: "Expiration");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PersistedGrants_SubjectId_ClientId_Type_Expiration",
                table: "PersistedGrants");

            migrationBuilder.DropIndex(
                name: "IX_DeviceCodes_Expiration",
                table: "DeviceCodes");

            migrationBuilder.CreateIndex(
                name: "IX_PersistedGrants_SubjectId_ClientId_Type",
                table: "PersistedGrants",
                columns: new[] { "SubjectId", "ClientId", "Type" });
        }
    }
}
