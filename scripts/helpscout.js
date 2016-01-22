const request = require('request');
const _ = require('lodash');

const TOKEN      = process.env.HELPSCOUT_API;
const MAILBOX_ID = process.env.HELPSCOUT_MAILBOX_ID;
const FOLDERS    = process.env.HELPSCOUT_FOLDERS.split(',');
const PREFIX     = `https://${TOKEN}:X@api.helpscout.net/v1`;

function showUnread(folder) {
  request(`${PREFIX}/mailboxes/${MAILBOX_ID}/folders/${folder.id}/conversations.json`, (err, res, body) => {
    var json = JSON.parse(body);

    if (json.count < 1) {
      return;
    }

    console.log('---');
    console.log(folder.name);
    _.forEach(json.items, (m) => console.log(m.subject));
  })
}
request(`${PREFIX}/mailboxes/${MAILBOX_ID}.json`, (err, res, body) => {
  var json = JSON.parse(body);
  var folders = json.item.folders;
  var unread = 0;

  folders = _.select(folders, f => FOLDERS.includes(f.name));
  folders = _.inject(folders, (acc, f) => {
    unread += f.totalCount;
    acc[f.name] = f;
    return acc;
  }, {})

  if (unread < 1) {
    console.log('📭')
    return;
  }

  console.log(`📬 ${unread}`);
  console.log('---');

  _.forEach(folders, f => console.log(`${f.name}:`, f.totalCount));
  _.forEach(folders, f => showUnread(f));
});
