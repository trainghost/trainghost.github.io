const playerData = {
  "장다민": { gender: "여" },
  "양승하": { gender: "남" },
  "우원석": { gender: "남" },
  "남상윤": { gender: "남" },
  "임예지": { gender: "여" },
  "이준희": { gender: "여" },
  "강민구": { gender: "남" },
  "임동민": { gender: "남" },
  "박소현": { gender: "여" },
  "박대우": { gender: "남" },
  "박은지": { gender: "여" },
  "류재리": { gender: "여" },
  "이재현": { gender: "남" },
  "감사": { gender: "남" },
  "나석훈": { gender: "남" },
  "김나연": { gender: "여" },
  "테스": { gender: "남" },
  "독고혁": { gender: "남" },
  "오리": { gender: "여" },
  "이성훈": { gender: "남" },
  "이종욱": { gender: "남" },
  "최하나": { gender: "여" },
  "김보경": { gender: "여" },
  "김경민": { gender: "남" },
  "모딩": { gender: "여" },
};

function convertToTable() {
  const input = document.getElementById('dataInput').value;
  const tableContainer = document.getElementById('tableContainer');
  const lines = input.trim().split('\n');
  
  if (lines.length === 0 || input.trim() === '') {
    tableContainer.innerHTML = '<p>데이터를 입력해주세요.</p>';
    return;
  }
  
  let html = '<table><thead><tr><th>순위</th><th>이름</th><th>성별</th><th>참석</th><th>늦참</th><th>승</th><th>무</th><th>패</th><th>승점 (전체/평균)</th><th>득실</th><th>승률</th><th>참가 횟수</th></tr></thead><tbody>';
  
  lines.forEach(line => {
    const data = line.trim().split(/\s*\/\s*|\s+/);
    
    if (data.length >= 8) {
      const rank = data[0].replace('.', '');
      const name = data[1];
      const gender = playerData[name] ? playerData[name].gender : '알 수 없음';
      const win = data[2];
      const draw = data[3];
      const lose = data[4];
      const points = data[5] + ' / ' + data[6];
      const goalDiff = data[7];
      const winRate = data[8];
      const participation = data[9];
      
      // 순위 정보를 data-rank 속성으로 추가
      html += `<tr>
                <td data-rank="${rank}">${rank}</td>
                <td>${name}</td>
                <td>${gender}</td>
                <td><input type="checkbox" class="참석-checkbox" data-name="${name}"></td>
                <td><input type="checkbox" class="늦참-checkbox" data-name="${name}"></td>
                <td>${win}</td>
                <td>${draw}</td>
                <td>${lose}</td>
                <td>${points}</td>
                <td>${goalDiff}</td>
                <td>${winRate}</td>
                <td>${participation}</td>
              </tr>`;
    }
  });
  
  html += '</tbody></table>';
  tableContainer.innerHTML = html;
}

function toggleAllCheckboxes(type) {
  const checkboxes = document.querySelectorAll(`.${type}-checkbox`);
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);

  checkboxes.forEach(cb => {
    cb.checked = !allChecked;
  });
}

function createBracket() {
  const bracketContainer = document.getElementById('bracketContainer');
  bracketContainer.innerHTML = '';

  const checkedFemalePlayers = Array.from(document.querySelectorAll('.참석-checkbox:checked'))
    .map(cb => {
      const name = cb.getAttribute('data-name');
      const row = cb.closest('tr');
      const rank = parseInt(row.querySelector('td[data-rank]').getAttribute('data-rank'));
      return { name, rank, gender: playerData[name].gender };
    })
    .filter(player => player.gender === '여');

  if (checkedFemalePlayers.length >= 4) {
    bracketContainer.innerHTML = '<p>여자 선수 4명을 참석으로 체크해야 대진표를 만들 수 있습니다.</p>';
    return;
  }

  // 순위를 기준으로 선수들을 정렬 (순위는 숫자가 낮을수록 높음)
  checkedFemalePlayers.sort((a, b) => a.rank - b.rank);
  
  // 팀 구성
  const teamA = [checkedFemalePlayers[0].name, checkedFemalePlayers[3].name]; // 순위 제일 높은 사람과 낮은 사람
  const teamB = [checkedFemalePlayers[1].name, checkedFemalePlayers[2].name]; // 나머지 2명

  // 대진표 HTML 생성
  const bracketHTML = `
    <h3>1번경기 (여자)</h3>
    <p><strong>Team A:</strong> ${teamA[0]} &amp; ${teamA[1]}</p>
    <p><strong>Team B:</strong> ${teamB[0]} &amp; ${teamB[1]}</p>
    <p><strong>Match Up:</strong> Team A vs Team B</p>
  `;
  
  bracketContainer.innerHTML = bracketHTML;
}
