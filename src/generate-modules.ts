import * as fs from 'fs';
import * as path from 'path';

const basePath = path.join(__dirname, 'modules');

const exclude = ['database'];

const folders = fs.readdirSync(basePath).filter((folder) => {
  const fullPath = path.join(basePath, folder);
  return fs.statSync(fullPath).isDirectory() && !exclude.includes(folder);
});

folders.forEach((folder) => {
  const folderPath = path.join(basePath, folder);
  const className = folder.charAt(0).toUpperCase() + folder.slice(1);
  const dtoPath = path.join(folderPath, `${folder}.dto`);
  if (!fs.existsSync(dtoPath)) fs.mkdirSync(dtoPath);

  const files = [
    {
      path: path.join(dtoPath, `create${className}.dto.ts`),
      content: `export class Create${className}Dto {\n  // TODO: define fields\n}`,
    },
    {
      path: path.join(dtoPath, `update${className}.dto.ts`),
      content: `export class Update${className}Dto {\n  // TODO: define fields\n}`,
    },
    {
      path: path.join(folderPath, `${folder}.controller.ts`),
      content: `import { Controller } from '@nestjs/common';\n\n@Controller('${folder}')\nexport class ${className}Controller {}`,
    },
    {
      path: path.join(folderPath, `${folder}.service.ts`),
      content: `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class ${className}Service {}`,
    },
    {
      path: path.join(folderPath, `${folder}.module.ts`),
      content: `import { Module } from '@nestjs/common';\nimport { ${className}Service } from './${folder}.service';\nimport { ${className}Controller } from './${folder}.controller';\n\n@Module({\n  controllers: [${className}Controller],\n  providers: [${className}Service],\n})\nexport class ${className}Module {}`,
    },
  ];

  files.forEach(({ path: filePath, content }) => {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Created: ${filePath}`);
    } else {
      console.log(`⏭️ Skipped (exists): ${filePath}`);
    }
  });
});
