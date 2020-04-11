import { Injectable } from '@angular/core';
import * as _ from 'underscore'

@Injectable()
export class PagingService {
  getPage(totalItem: number, currentPage: number, pageSize: number = 5) {
    let totalPages = Math.ceil(totalItem / pageSize)
    if (totalPages == 0) {
      totalPages = 1
    }
    let startPage: number, endPage: number
    if (totalPages <= 5) {
      startPage = 1
      endPage = totalPages
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        if ((totalPages - (currentPage - 2)) == 5) {
          startPage = currentPage - 1;
          endPage = currentPage + 3;
        } else {
          startPage = currentPage - 2;
          endPage = currentPage + 2;
        }
      }
    }
    let startIndex = (currentPage - 1) * pageSize
    let endIndex = Math.min(startIndex + pageSize - 1, totalItem - 1)

    let pages = _.range(startPage, endPage + 1)

    return {
      totalItem: totalItem,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    }
  }
}
