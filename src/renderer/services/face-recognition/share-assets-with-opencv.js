import { createFolder } from '@/services/misc'
import path from 'path'
import fs from 'fs'
import {
  HOME_ASSISTANT_FOLDER_PATH,
  HOME_ASSISTANT_TRAINER_IMGS_FOLDER_PATH,
  CLASSIFIER_FILE_NAME
} from './constants'

const createHomeAssistantTmpFolders = () => {
  createFolder(HOME_ASSISTANT_FOLDER_PATH)
  createFolder(HOME_ASSISTANT_TRAINER_IMGS_FOLDER_PATH)
}

const copyTrainerImgsAssetsToDeviceTmpFolder = () => {
  const trainerImgsPath = path.join(__static, '/trainer-img')
  const imgFilesNames = fs.readdirSync(trainerImgsPath)

  imgFilesNames.forEach(imgFileName =>
    fs.copyFileSync(
      path.join(__static, `/trainer-img/${imgFileName}`),
      `${HOME_ASSISTANT_FOLDER_PATH}trainer-img/${imgFileName}`
    )
  )
}

const copyClassifierFileToDeviceTmpFolder = () => {
  fs.copyFileSync(
    path.join(__static, `/${CLASSIFIER_FILE_NAME}`),
    `${HOME_ASSISTANT_FOLDER_PATH}${CLASSIFIER_FILE_NAME}`
  )
}

const copySharedAssetsToHomeAssistantTmpFolders = () => {
  copyTrainerImgsAssetsToDeviceTmpFolder()
  copyClassifierFileToDeviceTmpFolder()
}

export {
  createHomeAssistantTmpFolders,
  copySharedAssetsToHomeAssistantTmpFolders
}
