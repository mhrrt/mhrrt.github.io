---
title: "Swift Language Translation using Swift Package and DeepL AI"
datePublished: Tue Apr 15 2025 11:42:54 GMT+0000 (Coordinated Universal Time)
cuid: cm9jnurwf000e09l8a9df1axn
slug: swift-language-translation-using-swift-package-and-deepl-ai-97c79fcdeced
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1744791574397/d81e0521-de0f-4ae5-b4dd-9eaeea90b1f9.jpeg

---

Swift Package For Multi-language Support

### Why Swift Package?

Creating a Swift Package in Xcode is a great way to modularize your code, promote reusability, and manage dependencies across projects, its best when you want code that can work across iOS, macOS, watchOS, tvOS, and even server-side Swift. In this artical we will stick to integrate package with iOS app only.

### Steps to Create a Reusable Translation Component

Step 1: Create a Swift Package

1: Open Xcode → File → New → Package.

2: Name it AITranslationKit.

3: Choose Library and select Swift as the language.

4: Click Create and save it in your project directory.

Step 2: Implement AI Translation Logic

Step 3: Add Localized String Support so that its localised string can be accessed with minimum effor and in clear way.

1: In this package, create a LocalizationManager.swift file, this helps handle localized .strings files in your app.

Step 4: Make the Package Available for Other Apps

1: Open Package.swift and modify the target dependencies as:

Step 5: Use the Package in Your App

1: Open your iOS app project in Xcode.

2: Go to File → Add Packages Depandencies and add the AITranslationKit package from your local repo or GitHub.

3: Use it in your app as below:

That's how you can make you wrapper usable across multiple apps.

```swift
import Foundation

public class AITranslation {
    
    private var apiKey: String
    private var baseURL: String
    
    public init(deepLapiKey: String,
                baseURL: String = "https://api-free.deepl.com/v2/translate") {
        self.apiKey = deepLapiKey
        self.baseURL = baseURL
    }
    
    public func deepLTranslate(texts: [String],
                               sourceLanguage: String? = nil,
                               targetLanguage: String,
                               completion: @escaping (_ results: [String]?, _ error: Error?) -> Void) {
        guard let url = URL(string: baseURL) else {
            // throw error
            let error = NSError(domain: "", code: 601, userInfo: [NSLocalizedDescriptionKey: "Invalid baseURL"])
            completion(nil, error)
            return
        }
        
        // Build the body with multiple `text` parameters
        var params = "auth_key=\(apiKey)&target_lang=\(targetLanguage.uppercased())"
        if let source = sourceLanguage { // you can specify source language
            params += "&source_lang=\(source.uppercased())"
        }
        // get all string to make a query string
        for text in texts {
            if let encodedText = text.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) {
                params += "&text=\(encodedText)"
            }
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
        request.httpBody = params.data(using: .utf8)
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                completion(nil, error)
                return
            }
            
            do {
                if let json = try JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let translations = json["translations"] as? [[String: Any]] {
                    let results = translations.compactMap { $0["text"] as? String }
                    completion(results, nil)
                } else {
                    let error = NSError(domain: "", code: 600, userInfo: [NSLocalizedDescriptionKey: "Unable to parse response"])
                    completion(nil, error)
                }
            } catch {
                completion(nil, error)
            }
        }.resume()
    }
    
}
```

Step 3: Add Localized String Support so that its localised string can be accessed with minimum effor and in clear way.

1: In this package, create a LocalizationManager.swift file, this helps handle localized .strings files in your app.

```swift


import Foundation

public class LocalizationManager {
    public static func getLocalisedString(key: String, translatorComment: String = "") -> String {
        return NSLocalizedString(key, comment: translatorComment)
    }
}    
```

Step 4: Make the Package Available for Other Apps 1: Open Package.swift and modify the target dependencies as:

```swift


import PackageDescription

let package = Package(
    name: "AITranslation",
    platforms: [
        .iOS(.v12) // or later
    ],
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "AITranslation",
            targets: ["AITranslation"]),
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .target(
            name: "AITranslation"),
        .testTarget(
            name: "AITranslationTests",
            dependencies: ["AITranslation"]),
    ]
)
```

Step 5: Use the Package in Your App

1: Open your iOS app project in Xcode.

2: Go to File → Add Packages Depandencies and add the AITranslationKit package from your local repo or GitHub.

3: Use it in your app as below:

```swift

       
import UIKit
import AITranslation


class ViewController: UIViewController {

        override func viewDidLoad() {
        super.viewDidLoad()
        //Do any additional setup after loading the view.
        if let languageIdentifier = Locale.preferredLanguages.first {
            let components = Locale.Components(identifier: languageIdentifier)
            if let twoLetterIdentifier = components.languageComponents.languageCode?.identifier {
                code = identifier
                print("Two-letter language code: \(twoLetterIdentifier)")
                if twoLetterIdentifier != "en" {
                    getTranslationFor(targetLanguage: twoLetterIdentifier)
                }
            }
        }
    }
    
    func getTranslationFor(targetLanguage: String) {
        let translator = TITranslation(deepLapiKey: "c38f01d5-70f8-4844-a066-cc14cdd13226:fx")
        // List of keys from app localizable.string file
        let stringsToTranslate = [LocalizationManager.getLocalisedString(key: "txt_app_title"),
                                  LocalizationManager.getLocalisedString(key: "txt_subtitle"),
                                  LocalizationManager.getLocalisedString(key: "txt_declaration_lbl"),
                                  LocalizationManager.getLocalisedString(key: "txt_reset")]
        translator.deepLTranslate(texts: stringsToTranslate,
                                  targetLanguage: targetLanguage) { results, error in
            if let results = results { //success
                let translationDic = Dictionary(uniqueKeysWithValues: zip(stringsToTranslate, results))
                DispatchQueue.main.async {
                    //now for each item in dic pic required one and assign back to label or text object
                    self.lblTitle?.text = translationDic["txt_app_title".localized]
                    self.lblSubtitle?.text = translationDic["txt_subtitle".localized]
                    self.lblDescription?.text = translationDic["txt_declaration_lbl".localized]
                    self.btnReset?.setTitle(translationDic["txt_reset".localized], for: .normal)
                }
            } else {
                //show alert that something went wrong with translation
                print("Error while translating values: \(String(describing: error?.localizedDescription))")
            }
        }
    }
}
```

Thas’s how you can make you wrapper usable across multiple apps.

*Originally published at* [*https://mhrrt.github.io*](https://mhrrt.github.io/SwiftPackageLanguageTranslation/)*.*