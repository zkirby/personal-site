import * as fs from "fs";
import * as AWS from "aws-sdk";
import * as osa from "osa";

AWS.config.update({
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
});

async function fetchNote(): Promise<string> {
  // Use AppleScript to fetch the contents of the first note in the default Notes app.
  const note: string = osa(() => {
    const notesApp = osa.Application("Notes");
    const defaultAccount = notesApp.accounts[0];
    const defaultFolder = defaultAccount.folders[0];
    const firstNote = defaultFolder.notes[0];
    return firstNote.body();
  });
  return note;
}

async function uploadToS3(note: string): Promise<void> {
  // Set up the S3 client.
  const s3 = new AWS.S3();

  // Define the S3 bucket and object key where the note will be uploaded.
  const bucketName = "zkirby-personal/movies";
  const objectKey = "movies.json";

  // Upload the note to S3.
  const params = { Bucket: bucketName, Key: objectKey, Body: note };
  await s3.upload(params).promise();

  console.log(
    `Uploaded note to S3 bucket ${bucketName} with object key ${objectKey}`
  );
}

async function main(): Promise<void> {
  // Fetch the note.
  // const note = await fetchNote();

  // Upload the note to S3.
  await uploadToS3("hello");
}

main();

export {};
