import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { ArticleStateType, fontSizeOptions } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

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
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text size={38}>Размер шрифта</Text>
					<Select
						options={fontSizeOptions}
						selected={selectArticleData.fontSizeOption}
						onChange={(data) =>
							setSelectArticleData({
								...selectArticleData,
								fontSizeOption: data,
							})
						}
					/>
					<Separator />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
