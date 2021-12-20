import styles from './discussion.module.css';

import Discussion from '../../../../components/discussion';
import Comments from '../../../../components/comments';

import { marked } from 'marked';

export default function ThreadPage({
  data,
  query,
}) {
  const lolAssets = {
    name: 'lolAssets',
    level: 'inline',
    start(src) { return src.match(/{{/)?.index; },
    tokenizer(src, tokens) {
      const rule = /^{{(sticker|champion|summoner):[a-z0-9\-]{1,25}}}/;
      const match = rule.exec(src);
      if (match) {
        const token = {
          type: 'lolAssets',
          raw: match[0],
        };
        return token;
      }
    },
    renderer(token) {
      const [delimType, parseKey] = token.raw.slice(2, -2).split(':');
      // handle sticker
      // handle champion
      // handle summonerSpells
      const stickers = {
        'slayer-jinx-catface': 'slayer140/',
        'slayer-jinx-unamused': 'slayer140/',
        'slayer-jinx-wink': 'slayer140/',
        'slayer-pantheon-popcorn': 'slayer140/',
        'slayer-pantheon-rainbows': 'slayer140/',
        'slayer-pantheon-thumbs': 'slayer140/',
        'zombie-brand-clap': 'slayer140/',
        'zombie-brand-facepalm': 'slayer140/',
        'zombie-brand-mindblown': 'slayer140/',
        'zombie-nunu-bummed': 'slayer140/',
        'zombie-nunu-hearts': 'slayer140/',
        'zombie-nunu-tears': 'slayer140/',
        'cass-cry': 'slayer140/',
        'darius-angry': 'slayer140/',
        'draven-pose': 'slayer140/',
        'fiora-cool': 'slayer140/',
        'galio-happy': 'slayer140/',
        'garen-swing': 'slayer140/',
        'katarina-love': 'slayer140/',
        'leblanc-funny': 'slayer140/',
        'poppy-wink': 'slayer140/',
        'sona-playing': 'slayer140/',
        'vayne-pose': 'slayer140/',
        'vlad-salute': 'slayer140/',
        'sg-ahri-1': 'starguardian140/',
        'sg-ahri-2': 'starguardian140/',
        'sg-ahri-3': 'starguardian140/',
        'sg-ezreal': 'starguardian140/',
        'sg-janna': 'starguardian140/',
        'sg-jinx': 'starguardian140/',
        'sg-kiko': 'starguardian140/',
        'sg-lulu': 'starguardian140/',
        'sg-lux': 'starguardian140/',
        'sg-lux-2': 'starguardian140/',
        'sg-miss-fortune': 'starguardian140/',
        'sg-poppy': 'starguardian140/',
        'sg-shisa': 'starguardian140/',
        'sg-soraka': 'starguardian140/',
        'sg-syndra': 'starguardian140/',
        'sg-zephyr': 'starguardian140/',
      };
      const summonerSpells = {
        '1': 'SummonerBoost',
        '3': 'SummonerExhaust',
        '4': 'SummonerFlash',
        '6': 'SummonerHaste',
        '7': 'SummonerHeal',
        '11': 'SummonerSmite',
        '12': 'SummonerTeleport',
        '13': 'SummonerMana',
        '14': 'SummonerDot',
        '21': 'SummonerBarrier',
        '30': 'SummonerPoroRecall',
        '31': 'SummonerPoroThrow',
        '32': 'SummonerSnowball',
        '39': 'SummonerSnowURFSnowball_Mark',
        '54': 'Summoner_UltBookPlaceholder',
        '55': 'Summoner_UltBookSmitePlaceholder'
      };
      const champions = {
        '1': 'Annie',
        '2': 'Olaf',
        '3': 'Galio',
        '4': 'TwistedFate',
        '5': 'XinZhao',
        '6': 'Urgot',
        '7': 'Leblanc',
        '8': 'Vladimir',
        '9': 'Fiddlesticks',
        '10': 'Kayle',
        '11': 'MasterYi',
        '12': 'Alistar',
        '13': 'Ryze',
        '14': 'Sion',
        '15': 'Sivir',
        '16': 'Soraka',
        '17': 'Teemo',
        '18': 'Tristana',
        '19': 'Warwick',
        '20': 'Nunu',
        '21': 'MissFortune',
        '22': 'Ashe',
        '23': 'Tryndamere',
        '24': 'Jax',
        '25': 'Morgana',
        '26': 'Zilean',
        '27': 'Singed',
        '28': 'Evelynn',
        '29': 'Twitch',
        '30': 'Karthus',
        '31': 'Chogath',
        '32': 'Amumu',
        '33': 'Rammus',
        '34': 'Anivia',
        '35': 'Shaco',
        '36': 'DrMundo',
        '37': 'Sona',
        '38': 'Kassadin',
        '39': 'Irelia',
        '40': 'Janna',
        '41': 'Gangplank',
        '42': 'Corki',
        '43': 'Karma',
        '44': 'Taric',
        '45': 'Veigar',
        '48': 'Trundle',
        '50': 'Swain',
        '51': 'Caitlyn',
        '53': 'Blitzcrank',
        '54': 'Malphite',
        '55': 'Katarina',
        '56': 'Nocturne',
        '57': 'Maokai',
        '58': 'Renekton',
        '59': 'JarvanIV',
        '60': 'Elise',
        '61': 'Orianna',
        '62': 'MonkeyKing',
        '63': 'Brand',
        '64': 'LeeSin',
        '67': 'Vayne',
        '68': 'Rumble',
        '69': 'Cassiopeia',
        '72': 'Skarner',
        '74': 'Heimerdinger',
        '75': 'Nasus',
        '76': 'Nidalee',
        '77': 'Udyr',
        '78': 'Poppy',
        '79': 'Gragas',
        '80': 'Pantheon',
        '81': 'Ezreal',
        '82': 'Mordekaiser',
        '83': 'Yorick',
        '84': 'Akali',
        '85': 'Kennen',
        '86': 'Garen',
        '89': 'Leona',
        '90': 'Malzahar',
        '91': 'Talon',
        '92': 'Riven',
        '96': 'KogMaw',
        '98': 'Shen',
        '99': 'Lux',
        '101': 'Xerath',
        '102': 'Shyvana',
        '103': 'Ahri',
        '104': 'Graves',
        '105': 'Fizz',
        '106': 'Volibear',
        '107': 'Rengar',
        '110': 'Varus',
        '111': 'Nautilus',
        '112': 'Viktor',
        '113': 'Sejuani',
        '114': 'Fiora',
        '115': 'Ziggs',
        '117': 'Lulu',
        '119': 'Draven',
        '120': 'Hecarim',
        '121': 'Khazix',
        '122': 'Darius',
        '126': 'Jayce',
        '127': 'Lissandra',
        '131': 'Diana',
        '133': 'Quinn',
        '134': 'Syndra',
        '136': 'AurelionSol',
        '141': 'Kayn',
        '142': 'Zoe',
        '143': 'Zyra',
        '145': 'Kaisa',
        '147': 'Seraphine',
        '150': 'Gnar',
        '154': 'Zac',
        '157': 'Yasuo',
        '161': 'Velkoz',
        '163': 'Taliyah',
        '164': 'Camille',
        '166': 'Akshan',
        '201': 'Braum',
        '202': 'Jhin',
        '203': 'Kindred',
        '222': 'Jinx',
        '223': 'TahmKench',
        '234': 'Viego',
        '235': 'Senna',
        '236': 'Lucian',
        '238': 'Zed',
        '240': 'Kled',
        '245': 'Ekko',
        '246': 'Qiyana',
        '254': 'Vi',
        '266': 'Aatrox',
        '267': 'Nami',
        '268': 'Azir',
        '350': 'Yuumi',
        '360': 'Samira',
        '412': 'Thresh',
        '420': 'Illaoi',
        '421': 'RekSai',
        '427': 'Ivern',
        '429': 'Kalista',
        '432': 'Bard',
        '497': 'Rakan',
        '498': 'Xayah',
        '516': 'Ornn',
        '517': 'Sylas',
        '518': 'Neeko',
        '523': 'Aphelios',
        '526': 'Rell',
        '555': 'Pyke',
        '711': 'Vex',
        '777': 'Yone',
        '875': 'Sett',
        '876': 'Lillia',
        '887': 'Gwen'
      };
      // If the sticker doesn't exist, just return the original string
      // Stickers List: https://www.reddit.com/r/leagueoflegends/comments/fc9ra0/all_the_stickers_from_the_league_forums_in_one/
      // Thanks to u/DarkAndromeda31
      // https://drive.google.com/drive/folders/1uwcG2HwBKMzx2hE809b_tbbrn6pw704u

      const handlers = {
        sticker(key) {
          const baseUrl = 'https://lolstatic-a.akamaihd.net/stickers/';
          return stickers[key] ? `<span class="sticker" style="background-image: url(${baseUrl + stickers[key] + key}.png)"></span>` : null;
        },
        champion(key) {
          const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/';
          // https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/Gwen.png
          return champions[key] ? `<span style="display: inline-block; background-size: cover; height: 36px; width: 36px; background-image: url(${baseUrl + champions[key]}.png)"></span>` : null;
        },
        summoner(key) {
          const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/';
          return summonerSpells[key] ? `<span style="display: inline-block; background-size: cover; height: 36px; width: 36px; background-image: url(${baseUrl + summonerSpells[key]}.png)"></span>` : null;
        },
      };
      console.log(delimType);
      console.log(handlers[delimType], parseKey);
      console.log(handlers[delimType](parseKey));
      const output = handlers[delimType](parseKey);
      return output ? output : token.raw;

    }
  };

  marked.use({ extensions: [lolAssets] });

  return (
    <div className={styles.container}>
      <h2>{data.application.name}</h2>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <Discussion query={query} data={data} />
          <Comments />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getDiscussion } = await import('../../../../models/discussions');
  const { rows } = await getDiscussion(context);
  const results = rows[0]?.results;

  if (!results) {
    return {
      props: {
        notFound: true,
      }
    }
  }

  return {
    props: {
      pageTitle: results.title,
      data: results,
      query: context.query
    }
  }
}