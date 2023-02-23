const fs = require('fs');
const path = require('path');

const wifeClothes = {
    1: 'animal-costume-racoon.png',
    2: 'animal-costume.png',
    3: 'bunny-girl-costume-red.png',
    4: 'bunny-girl-costume.png',
    5: 'cake-costume-choco.png',
    6: 'cake-costume-cream.png',
    7: 'default-costume.png',
    8: 'dress-costume-brown.png',
    9: 'dress-costume.png',
    10: 'elementary-school-costume-navy.png',
    11: 'elementary-school-costume.png',
    12: 'fall-dress-costume-beige.png',
    13: 'fall-dress-costume-brown.png',
    14: 'frill-bikini-costume-green.png',
    15: 'frill-bikini-costume-purple.png',
    16: 'frill-blouse-costume-green.png',
    17: 'frill-blouse-costume-red.png',
    18: 'furisode-costume.png',
    19: 'halloween-costume.png',
    20: 'hanbok-costume-pink.png',
    21: 'hanbok-costume-red.png',
    22: 'hanbok-costume-skyblue.png',
    23: 'hanbok-costume-yellow.png',
    24: 'hanbok-costume.png',
    25: 'healer-costume.png',
    26: 'kids-costume-navy.png',
    27: 'kids-costume.png',
    28: 'maid-costume-red.png',
    29: 'maid-costume.png',
    30: 'new2015-costume-pajamas.png',
    31: 'new2015-costume.png',
    32: 'night-witch-costume-black.png',
    33: 'night-witch-costume-gray.png',
    34: 'nightsky-costume.png',
    35: 'overalls-costume-white.png',
    36: 'overalls-costume.png',
    37: 'pajamas-costume-pink.png',
    38: 'pajamas-costume.png',
    39: 'party-dress-costume-brown.png',
    40: 'party-dress-costume-purple.png',
    41: 'qipao-costume-pink.png',
    42: 'qipao-costume-red.png',
    43: 'ribbon-dress-costume-red.png',
    44: 'ribbon-dress-costume-yellow.png',
    45: 'sailor-costume-black.png',
    46: 'sailor-costume.png',
    47: 'sakura-costume-navy.png',
    48: 'sakura-costume.png',
    49: 'santa-costume-green.png',
    50: 'santa-costume.png',
    51: 'sarori-costume.png',
    52: 'school-2017-costume-gray.png',
    53: 'school-2017-costume-yellow.png',
    54: 'school-costume-red.png',
    55: 'school-costume.png',
    56: 'sfc-uniform-costume-red.png',
    57: 'sfc-uniform-costume-yellow.png',
    58: 'shaman-costume-black.png',
    59: 'shaman-costume-blue.png',
    60: 'sinsiroad-shop-costume-junior.png',
    61: 'sinsiroad-shop-costume-senior.png',
    62: 'sorceress-costume.png',
    63: 'sporty-hood-costume-black.png',
    64: 'sporty-hood-costume-blue.png',
    65: 'star-witch-costume-brown.png',
    66: 'star-witch-costume.png',
    67: 'succubus-costume-black.png',
    68: 'succubus-costume-red.png',
    69: 'sukumizu-costume-white.png',
    70: 'sukumizu-costume.png',
    71: 'summer-dress-costume-blue.png',
    72: 'summer-dress-costume-white.png',
    73: 'swimsuit-2017-costume-navy.png',
    74: 'swimsuit-2017-costume-red.png',
    75: 'tirami1-costume.png',
    76: 'turtleneck-costume-red.png',
    77: 'turtleneck-costume.png',
    78: 'valentine-costume-brown.png',
    79: 'valentine-costume-pink.png',
    80: 'winter-coat-2017-costume-brown.png',
    81: 'winter-coat-2017-costume-white.png',
    82: 'winter-coat-costume-pink.png',
    83: 'winter-coat-costume-white.png',
    84: 'winter-costume-white.png',
    85: 'winter-costume.png',
    86: 'witch-costume-white.png',
    87: 'witch-costume.png',
}


const defaultJson = {
    "version": "1.0.0",
    "model": "model.moc",
    "textures": [
        "textures/default-costume.png"
    ],
    "layout": {
        "center_x": 0.0,
        "center_y": -0.05,
        "width": 2.0
    },
    "hit_areas_custom": {
        "head_x": [-0.35, 0.6],
        "head_y": [0.19, -0.2],
        "body_x": [-0.3, -0.25],
        "body_y": [0.3, -0.9]
    },
    "motions": {
        "idle": [{
                "file": "motions/Breath1.mtn"
            },
            {
                "file": "motions/Breath2.mtn"
            },
            {
                "file": "motions/Breath3.mtn"
            },
            {
                "file": "motions/Breath5.mtn"
            },
            {
                "file": "motions/Breath7.mtn"
            },
            {
                "file": "motions/Breath8.mtn"
            }
        ],
        "sleepy": [{
            "file": "motions/Sleeping.mtn"
        }],
        "flick_head": [{
                "file": "motions/Touch Dere1.mtn"
            },
            {
                "file": "motions/Touch Dere2.mtn"
            },
            {
                "file": "motions/Touch Dere3.mtn"
            },
            {
                "file": "motions/Touch Dere4.mtn"
            },
            {
                "file": "motions/Touch Dere5.mtn"
            },
            {
                "file": "motions/Touch Dere6.mtn"
            }
        ],
        "tap_body": [{
                "file": "motions/Sukebei1.mtn"
            },
            {
                "file": "motions/Sukebei2.mtn"
            },
            {
                "file": "motions/Sukebei3.mtn"
            },
            {
                "file": "motions/Touch1.mtn"
            },
            {
                "file": "motions/Touch2.mtn"
            },
            {
                "file": "motions/Touch3.mtn"
            },
            {
                "file": "motions/Touch4.mtn"
            },
            {
                "file": "motions/Touch5.mtn"
            },
            {
                "file": "motions/Touch6.mtn"
            }
        ]
    }
}


const getCurrentClothes = (modelId) => {
    return Object.assign(defaultJson, {
        textures: [`textures/${ wifeClothes[modelId] }`]
    })
}


const wifeNumber = 88
for (let i = 1; i < wifeNumber; i++) {
    const platformConfigPath = path.join(__dirname, `./model/index${i}.json`)
    //  已经有文件了就干掉！！！！！
    if (fs.existsSync(platformConfigPath)) {
        fs.unlinkSync(platformConfigPath);
    }
    // if (!fs.existsSync(path.dirname(platformConfigPath))) {
    //     fs.mkdirSync(path.dirname(platformConfigPath), {recursive: true})
    // }
    // console.log('fs.existsSync(platformConfigPath)', fs.existsSync(platformConfigPath))
    // console.log('!fs.existsSync(path.dirname(platformConfigPath))', !fs.existsSync(path.dirname(platformConfigPath)))
    let result = getCurrentClothes(i)
    fs.appendFileSync(platformConfigPath, JSON.stringify(result), {
        encoding: 'utf-8'
    })
}
