/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
const msalConfig = {
    auth: {
        // 'clientId' is the Application (client) ID from the app registration in Azure portal.
        // YOU MUST REPLACE THIS WITH YOUR ACTUAL CLIENT ID AFTER REGISTRATION!
        clientId: "ff0dd981-1b02-480e-b11a-0ab3c1ce0363",
        
        // 'authority' is the Azure AD directory (tenant) endpoint.
        // Replace 'YOUR_TENANT_ID_HERE' with your actual Directory (tenant) ID.
        // If your users are only within your organization, use: https://login.microsoftonline.com/e15a0c3c-2ae3-4e09-9a5a-2761fe14856f
        // If it's multi-tenant or personal Microsoft accounts, use: https://login.microsoftonline.com/common
        authority: "https://login.microsoftonline.com/e15a0c3c-2ae3-4e09-9a5a-2761fe14856f",
        
        // 'redirectUri' is where the user is sent after signing in.
        // When running locally, it's usually http://localhost:8080 or similar.
        // When hosted on GitHub Pages, it will be the GitHub URL (e.g., https://yourusername.github.io/student-dashboard/)
        // You MUST register this exact URL in the Azure Portal > Authentication > Single-page application redirect URIs.
        redirectUri: window.location.href.split('?')[0].split('#')[0]
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * We need 'Files.Read' to read the Excel file from OneDrive/SharePoint.
 */
const loginRequest = {
    scopes: ["User.Read", "Files.Read"]
};

/**
 * Replace this with the exact path or ID of your Excel file in OneDrive.
 * 
 * IF THE FILE IS IN YOUR PERSONAL ONEDRIVE (OneDrive for Business):
 * Use: "https://graph.microsoft.com/v1.0/me/drive/root:/FolderName/ExcelFileName.xlsx:/content"
 * 
 * IF THE FILE IS IN A SHAREPOINT SITE (e.g. Teams Document Library):
 * You need the site ID and drive ID, OR you can use search. 
 * Easiest way to find the file ID is using Microsoft Graph Explorer (https://developer.microsoft.com/en-us/graph/graph-explorer).
 * If you have the file ID: "https://graph.microsoft.com/v1.0/me/drive/items/{ITEM-ID}/content"
 * 
 * For this example, let's assume it's in the root of OneDrive in a folder called "DashboardData" and named "Data.xlsx".
 */
const GRAPH_FILE_ENDPOINT = "https://graph.microsoft.com/v1.0/me/drive/root:/DashboardData/Data.xlsx:/content";
