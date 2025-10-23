const calendarEl = document.getElementById('calendar');
const notesEl = document.getElementById('note-list');

// 曜日ヘッダー
const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
weekdays.forEach(day => {
  const header = document.createElement('div');
  header.className = 'day-header';
  header.textContent = day;
  calendarEl.appendChild(header);
});

// === 設定===
const year = 2025; // 西暦
const month = 9;   // 0=1月, 9=10月（令和7年10月） n+1
const firstDay = new Date(year, month, 1).getDay();
const lastDate = new Date(year, month + 1, 0).getDate();

// === カレンダーを構築 ===
fetch('data/schedule.json')
  .then(res => res.json())
  .then(data => {
    let dayCount = 0;

    // 前月分の空白セルを追加
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'day-cell empty';
      calendarEl.appendChild(empty);
      dayCount++;
    }

    // 当月の日付セル
    for (let d = 1; d <= lastDate; d++) {
      const cell = document.createElement('div');
      cell.className = 'day-cell';

      const dateSpan = document.createElement('span');
      dateSpan.className = 'date';
      dateSpan.textContent = d;
      cell.appendChild(dateSpan);

      const event = data.days.find(e => e.date === d);
      if (event) {
        const eventP = document.createElement('p');
        eventP.className = 'event';
        eventP.textContent = event.event;
        cell.appendChild(eventP);
      }

      calendarEl.appendChild(cell);
      dayCount++;
    }

    // 次月分の空白セル（行をそろえるため）
    while (dayCount % 7 !== 0) {
      const empty = document.createElement('div');
      empty.className = 'day-cell empty';
      calendarEl.appendChild(empty);
      dayCount++;
    }

    // 補足情報リスト
    data.notes.forEach(note => {
      const li = document.createElement('li');
      li.textContent = note;
      notesEl.appendChild(li);
    });
  })
  .catch(err => {
    console.error("予定データ読み込みエラー:", err);
  });