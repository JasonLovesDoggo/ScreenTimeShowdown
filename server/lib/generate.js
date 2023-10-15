const cohere = require('cohere-ai');
const config = require('../config');

cohere.init(config.cohere.apikey);

module.exports.generate = async (name, user, day, n, maxtokens) => {
    let prompts = [
        `Use coarse language to bully ${name} for failing to break their addiction of scrolling Instagram Reels (in 3 sentences)`,
        `In a game to see who can last longest without social media, ${name} has started scrolling Instagram Reels on day ${day}. Write a short blurb to shame them using coarse language in 3 sentences.`,
        `In a game to see who can last longest without social media, ${name} has started scrolling Instagram Reels on day ${day}. Write a short blurb to reprimand them using compassionate language in 3 sentences.`,
        `Write a short blurb to congratulate ${name} from breaking their addiction to scrolling Instagram Reels`,
        `Congratulate ${name} for winning the pot in a bet to break social media addiction in under 3 sentences`
    ];

    const response = await cohere.generate({
        model: 'command',
        prompt: prompts[n],
        max_tokens: maxtokens ?? 200,
        temperature: 0.9,
        k: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE'
    });
    //console.log(response.body.generations[0].text);
    return response.body.generations[0].text;
}
