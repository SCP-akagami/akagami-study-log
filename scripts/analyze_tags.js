const fs = require('fs');
const path = require('path');

// postsディレクトリ内のすべてのMarkdownファイルからタグを抽出
function extractTags() {
  const postsDir = path.join(process.cwd(), 'posts');
  const tags = new Set();
  const tagCount = {};

  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const tagMatch = content.match(/tags:\s*\[(.*?)\]/);
        
        if (tagMatch) {
          const tagString = tagMatch[1];
          const fileTags = tagString
            .split(',')
            .map(tag => tag.trim().replace(/['"]/g, ''))
            .filter(tag => tag.length > 0);
          
          fileTags.forEach(tag => {
            tags.add(tag);
            tagCount[tag] = (tagCount[tag] || 0) + 1;
          });
        }
      }
    }
  }

  scanDirectory(postsDir);
  
  return { tags: Array.from(tags), tagCount };
}

// タグを分類する
function categorizeTags(tags) {
  const categories = {
    '技術・フレームワーク系': [],
    '学習・開発系': [],
    'AI・MCP系': [],
    'クラウド・インフラ系': [],
    'ビジネス・戦略系': [],
    'その他': []
  };

  tags.forEach(tag => {
    if (tag.includes('Next.js') || tag.includes('React') || tag.includes('Docker') || 
        tag.includes('CSS') || tag.includes('Markdown') || tag.includes('Math')) {
      categories['技術・フレームワーク系'].push(tag);
    } else if (tag.includes('学習') || tag.includes('デバッグ') || tag.includes('コード') || 
               tag.includes('開発') || tag.includes('Test')) {
      categories['学習・開発系'].push(tag);
    } else if (tag.includes('AI') || tag.includes('MCP') || tag.includes('エージェント') || 
               tag.includes('プロンプト') || tag.includes('自然言語')) {
      categories['AI・MCP系'].push(tag);
    } else if (tag.includes('AWS') || tag.includes('クラウド')) {
      categories['クラウド・インフラ系'].push(tag);
    } else if (tag.includes('ビジネス') || tag.includes('戦略') || tag.includes('価値')) {
      categories['ビジネス・戦略系'].push(tag);
    } else {
      categories['その他'].push(tag);
    }
  });

  return categories;
}

// メイン処理
function main() {
  const { tags, tagCount } = extractTags();
  const categories = categorizeTags(tags);

  console.log('=== タグ分析結果 ===\n');
  
  console.log('📊 使用頻度の高いタグ（上位10個）:');
  const sortedTags = Object.entries(tagCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);
  
  sortedTags.forEach(([tag, count]) => {
    console.log(`  ${tag}: ${count}回`);
  });

  console.log('\n📂 カテゴリ別タグ分類:');
  Object.entries(categories).forEach(([category, tagList]) => {
    if (tagList.length > 0) {
      console.log(`\n  ${category}:`);
      tagList.forEach(tag => {
        const count = tagCount[tag];
        console.log(`    - ${tag} (${count}回)`);
      });
    }
  });

  console.log(`\n📈 統計情報:`);
  console.log(`  - 総タグ数: ${tags.length}`);
  console.log(`  - 総使用回数: ${Object.values(tagCount).reduce((a, b) => a + b, 0)}`);
}

if (require.main === module) {
  main();
}

module.exports = { extractTags, categorizeTags }; 