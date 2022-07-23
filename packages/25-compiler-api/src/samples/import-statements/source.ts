// 不允许使用 fs 下的 sync API
import { readFileSync } from 'fs';
// 自动将其替换为 fs/promises 下的 async API
// import { readFile } from 'fs/promises';

// 此导入必须存在，且不允许实际导入值
import 'some_required_polyfill';
