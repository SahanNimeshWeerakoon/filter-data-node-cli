import arg from 'arg';
import { getTitles } from './main';

export async function cli(args) {
	getTitles(args);
}