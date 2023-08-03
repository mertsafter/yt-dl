const fs = require('fs');
const ytdl = require('ytdl-core');
var sanitize = require("sanitize-filename");
var ProgressBar = require('progress');



const data = fs.readFileSync('./songs.txt', { encoding: 'UTF-8', flag: 'r' })

const lines = data.split(/\r?\n/).filter(line => line.length).map(line => line.trim())
var bar = new ProgressBar(`:bar :current/:total`, { total: lines.length });
download(lines)

async function download(lines) {
    for (let line of lines) {
        bar.tick(1)
        const info = await ytdl.getBasicInfo(line)
        ytdl(line, { quality: 'highestaudio' })
            .pipe(fs.createWriteStream(`./songs/${sanitize(info.videoDetails.title)}.mp3`));
    }
}


