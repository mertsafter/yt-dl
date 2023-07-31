const fs = require('fs');
const ytdl = require('ytdl-core');

const data = fs.readFileSync('./songs.txt', { encoding: 'UTF-8', flag: 'r' })

const lines = data.split(/\r?\n/).map(line => line.trim())

download(lines)

async function download(lines) {
    for (let line of lines) {
        const info = await ytdl.getBasicInfo(line)
        console.log()
        ytdl('https://www.youtube.com/watch?v=aLRletzlJ-4', { quality: 'highestaudio' })
            .pipe(fs.createWriteStream(`./songs/${info.videoDetails.title}.mp3`));
    }
}


