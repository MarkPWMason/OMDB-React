import React, { useContext } from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import styles from './Pagination.module.css';
import { Contexts } from '../store/context/context';
const Pagination = (props: any) => {
  const { onPageChange, totalPages, siblingCount = 1, className } = props;
  const Context = useContext(Contexts);
  const currentPage = Context.page;

  console.log('current page', currentPage, props);

  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (paginationRange) {
    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }
  }

  const onNext = () => {
    console.log('On Next', currentPage + 1);
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    console.log('On Previous', currentPage - 1);
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange
    ? paginationRange[paginationRange.length - 1]
    : null;

  return (
    <ul
      className={classnames(styles.paginationContainer, {
        [className]: className,
      })}
    >
      {/* Left navigation arrow */}
      <li
        className={classnames(styles.paginationItem, {
          disabled: currentPage === 1,
        })}
        onClick={() => {
          if (currentPage !== 1) {
            onPrevious();
          }
        }}
      >
        <div className={`${styles.arrow} ${styles.left}`} />
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li className={`${styles.paginationItem} ${styles.dots}`}>
                &#8230;
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              className={classnames(styles.paginationItem, {
                selected: pageNumber === currentPage,
              })}
              onClick={() => {
                console.log('onClicl', pageNumber);
                onPageChange(pageNumber);
              }}
            >
              {pageNumber}
            </li>
          );
        })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames(styles.paginationItem, {
          disabled: currentPage === lastPage,
        })}
        onClick={() => {
          if (currentPage !== lastPage) {
            onNext();
          }
        }}
      >
        <div className={`${styles.arrow} ${styles.right}`} />
      </li>
    </ul>
  );
};

export default Pagination;
