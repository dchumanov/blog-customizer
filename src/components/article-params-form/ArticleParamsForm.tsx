import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	currentArticle: ArticleStateType;
	setCurrentArticle: (article: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticle,
	setCurrentArticle,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectArticleData, setSelectArticleData] = useState(currentArticle);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticle({
			...selectArticleData,
		});
	};

	const handleFormReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticle({
			...defaultArticleState,
		});
		setSelectArticleData({
			...selectArticleData,
			...defaultArticleState,
		});
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(!isOpen),
		onChange: setIsOpen,
		eventName: 'mousedown',
	});

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as={'h2'} size={31} uppercase={true} weight={800}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectArticleData.fontFamilyOption}
						title='Шрифт'
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								fontFamilyOption: data,
							})
						}
					/>
					<RadioGroup
						selected={selectArticleData.fontSizeOption}
						name='fontsize_radio'
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								fontSizeOption: data,
							})
						}
					/>
					<Select
						options={fontColors}
						selected={selectArticleData.fontColor}
						title='Цвет шрифта'
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								fontColor: data,
							})
						}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectArticleData.backgroundColor}
						title='Цвет фона'
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								backgroundColor: data,
							})
						}
					/>
					<Select
						options={contentWidthArr}
						selected={selectArticleData.contentWidth}
						title='Ширина контента'
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								contentWidth: data,
							})
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
